import * as React from 'react';
import { compose, withState } from 'recompose';
import { cssGroups, mapPropsStream, mapStyle, withTrigger } from 'mishmash';

import Div from '../../div';
import Txt from '../../txt';

import Label from '../components/Label';

import checkFile from './checkFile';
import uploaders from './uploaders';

const hiddenStyle = {
  position: 'fixed' as 'fixed',
  bottom: '200%',
  right: '200%',
};

const fileIcons = {
  doc: '-txt',
  docx: '-txt',
  txt: '-txt',
  pdf: '-pdf',
  png: '-img',
  jpg: '-img',
  jpeg: '-img',
};

let counter = 0;

export default compose<any, any>(
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
            config.serverUrl.startsWith(event.origin) &&
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
          ...otherProps
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
    base: [['filter', ...cssGroups.other], ['merge', { cursor: 'pointer' }]],
    label: [
      ['mergeKeys', { active: isFocused, processing }],
      ['filter', ...cssGroups.text, ...cssGroups.box],
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
      ['filter', ...cssGroups.text, ...cssGroups.box, 'width'],
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
  }) => (
    <label
      {...hoverProps}
      onMouseDown={onMouseDown}
      style={style.base}
      className="e5 e6 e7 e8 e9"
    >
      <Div style={{ layout: 'bar', width: '100%' }}>
        <div>
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
        </div>
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
        {Object.keys(info.data).map(k => (
          <input type="hidden" name={k} value={info.data[k]} key={k} />
        ))}

        {!clear && (
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
          />
        )}
      </form>

      {!clear && (
        <iframe
          style={hiddenStyle}
          name={`iframe:${uploadIndex}`}
          src=""
          onLoad={onComplete}
          tabIndex={-1}
        />
      )}
    </label>
  ),
);
