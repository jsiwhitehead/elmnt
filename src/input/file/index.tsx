import * as React from 'react';
import { compose, withState } from 'recompose';
import { mapStyle } from 'highstyle';
import { Comp, mapPropsStream, Obj, withTrigger } from 'mishmash';

import Div from '../../div';
import Txt from '../../txt';

import checkFile from './checkFile';
import uploaders from './uploaders';

const hiddenStyle = {
  position: 'fixed' as 'fixed',
  bottom: '200%',
  right: '200%',
};

const fileIcons = { pdf: '-pdf', txt: '-txt' };

let counter = 0;

export default function createFile({ Label }: Obj<Comp>) {
  return compose<any, any>(
    withState('state', 'setState', {}),
    withTrigger('clear', 'triggerClear'),
    mapPropsStream(props$ => {
      let form;
      let input;
      let focusOnReset = false;
      let successful = false;
      let prevValue;
      let listener;

      props$.take(1).observe(({ value }) => (prevValue = value || null));

      const uploadIndex = counter++;
      props$
        .observe(({ config }) => {
          window.removeEventListener('message', listener);
          listener = window.addEventListener('message', event => {
            if (
              config.successUrl.startsWith(event.origin) &&
              event.data === uploadIndex
            ) {
              successful = true;
            }
          });
        })
        .then(() => window.removeEventListener('message', listener));

      return props$
        .map(({ state, ...props }) => ({
          ...props,
          ...state,
          uploadIndex,
        }))
        .map(props => {
          const {
            value,
            onChange,
            maxKb,
            fileType,
            config,
            fileName,
            setState,
            triggerClear,
            setFocusElem,
            ...otherProps,
          } = props;

          const { prepareUpload, getUploadInfo } = uploaders[config.uploader](
            config,
          );
          const info = getUploadInfo(props);

          const reset = () => {
            focusOnReset = document.activeElement === input;
            successful = false;
            triggerClear();
            setState({});
          };

          return {
            fileName: value ? value.split(/\:(.+)$/)[1] : fileName || '',
            processing: !!fileName,
            info,
            ...otherProps,

            onChange: async () => {
              if (input.value) {
                if (checkFile(input.files, input.value, maxKb, fileType)) {
                  onChange(null);
                  const fileName = input.value
                    .split('/')
                    .pop()
                    .split('\\')
                    .pop();
                  setState({ fileName });
                  const uploadState = await prepareUpload(props);
                  setState({ fileName, ...uploadState }, () => form.submit());
                }
              }
            },

            onComplete: () =>
              setTimeout(() => {
                if (info.fileId) {
                  if (successful) {
                    prevValue = `${info.fileId}:${fileName}`;
                  } else {
                    alert(
                      "Upload failed. It's likely that the file you chose is too big, please try again",
                    );
                  }
                  onChange(prevValue);
                  reset();
                }
              }),

            onClick: event => {
              if (!value && fileName) {
                onChange(prevValue);
                reset();
                event.preventDefault();
              }
            },
            onKeyDown: event => {
              if (event.keyCode === 13 || event.keyCode === 32) {
                input.click();
                event.preventDefault();
              }
            },
            onClear: event => {
              if (value) {
                prevValue = null;
                onChange(null);
              }
              if (input) input.focus();
              event.preventDefault();
            },
            onMouseDown: event => {
              event.preventDefault();
            },

            setFormElem: c => (form = c),
            setFocusElem: c => {
              input = c;
              setFocusElem(c);
              if (input && focusOnReset) {
                input.focus();
                focusOnReset = false;
              }
            },
          };
        });
    }, true),
    mapStyle(['isFocused', 'processing'], (isFocused, processing) => ({
      base: [
        ['filter', 'width', 'height', 'maxWidth', 'maxHeight'],
        ['merge', { cursor: 'pointer' }],
      ],
      label: [
        ['mergeKeys', { active: isFocused, processing }],
        [
          'merge',
          {
            borderRightWidth: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        ],
      ],
      button: [
        ['mergeKeys', { active: isFocused, button: true }],
        ['merge', { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }],
      ],
    })),
  )(
    ({
      fileName,
      processing,
      uploadIndex,
      placeholder,
      info,
      clear,
      onChange,
      onComplete,
      onClick,
      onKeyDown,
      onClear,
      onMouseDown,
      setFormElem,
      setFocusElem,
      hoverProps,
      focusProps,
      style,
    }) =>
      <label {...hoverProps} onMouseDown={onMouseDown} style={style.base}>

        <Div style={{ layout: 'bar', width: '100%' }}>
          <Label
            text={`${fileName}${processing ? ' (uploading...)' : ''}`}
            iconLeft={
              fileName && `file${fileIcons[fileName.split('.').pop()] || ''}`
            }
            iconRight={fileName && !processing && 'cross'}
            onClickRight={onClear}
            placeholder={placeholder}
            style={style.label}
          />
          <Txt style={style.button}>
            {processing ? 'Cancel' : fileName ? 'Change' : 'Upload'}
          </Txt>
        </Div>

        <form
          action={info.url}
          method="POST"
          encType="multipart/form-data"
          target={`iframe:${uploadIndex}`}
          ref={setFormElem}
        >

          {Object.keys(info.data).map(k =>
            <input type="hidden" name={k} value={info.data[k]} key={k} />,
          )}

          {!clear &&
            <input
              name="file"
              type="file"
              onChange={onChange}
              onClick={onClick}
              onKeyDown={onKeyDown}
              style={hiddenStyle}
              id={`file:${uploadIndex}`}
              {...focusProps}
              ref={setFocusElem}
            />}

        </form>

        {!clear &&
          <iframe
            style={hiddenStyle}
            name={`iframe:${uploadIndex}`}
            src=""
            onLoad={onComplete}
            tabIndex={-1}
          />}

      </label>,
  ) as React.ComponentClass<any>;
}
