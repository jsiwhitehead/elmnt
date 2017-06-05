import * as React from 'react';
import { compose, withState } from 'recompose';
import { mapStyle } from 'highstyle';
import { Comp, mapPropsStream, Obj, withTrigger } from 'mishmash';

import Div from '../../div';
import Txt from '../../txt';

import checkFile from './checkFile';
import uploaders from './uploaders';

const hiddenStyle = { position: 'fixed' as 'fixed', bottom: '200%', right: '200%' };

const getFileIcon = (fileName) => (
  `file${{ pdf: '-pdf', txt: '-txt' }[fileName.split('.').pop()] || ''}`
);

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

      const uploadIndex = counter++;
      props$.observe(({ config }) => {
        window.addEventListener('message', (event) => {
          if (config.successUrl.startsWith(event.origin) && event.data === uploadIndex) {
            successful = true;
          }
        });
      });

      return props$.map(({ state, ...props }) => ({
        ...props,
        ...state,
        uploadIndex,
      })).map(props => {

        const {
          value, onChange, maxKb, fileType, config, fileName, setState, clear, triggerClear,
          setFocusElem, hoverProps, focusProps, style,
        } = props;

        const { prepareUpload, getUploadInfo } = uploaders[config.uploader](config);
        const info = getUploadInfo(props);

        const reset = (loadPrev?: boolean) => {
          focusOnReset = document.activeElement === input;
          successful = false;
          triggerClear();
          setState({});
          if (loadPrev) onChange(prevValue);
          else prevValue = value;
        };

        return {

          fileName: value ? value.fileName : (fileName || ''),
          processing: !!fileName,
          uploadIndex,
          info,
          clear,
          hoverProps,
          focusProps,
          style,

          onChange: async () => {
            if(input.value) {
              if (checkFile(input.files, input.value, maxKb, fileType)) {
                const fileName = input.value.split('/').pop().split('\\').pop();
                setState({ fileName });
                const uploadState = await prepareUpload(props);
                setState({ fileName, ...uploadState }, () => form.submit());
              }
            }
          },

          onComplete: () => setTimeout(() => {
            if (info.fileId) {
              if (successful) {
                onChange({ fileName, fileId: info.fileId });
              } else {
                alert(
                  'Upload failed. ' +
                  'It\'s likely that the file you chose is too big, please try again',
                );
              }
              reset(!successful);
            }
          }),

          onClick: event => {
            if (!value && fileName) {
              reset(true);
              event.preventDefault();
            }
          },
          onKeyDown: event => {
            if ((event.keyCode === 13) || (event.keyCode === 32)) {
              input.click();
              event.preventDefault();
            }
          },

          setFormElem: c => form = c,
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

    mapStyle(['isFocused'], (isFocused) => ({
      base: [
        ['filter', 'width', 'height', 'maxWidth', 'maxHeight'],
        ['merge', { cursor: 'pointer' }],
      ],
      label: [
        ['mergeKeys', { active: isFocused }],
      ],
      button: [
        ['mergeKeys', 'button'],
      ],
    })),

  )(({
    fileName, processing, uploadIndex, placeholder, info, clear, onChange, onComplete,
    onClick, onKeyDown, setFormElem, setFocusElem, hoverProps, focusProps, style,
  }) =>
    <label {...hoverProps} style={style.base}>

      <Div style={{ layout: 'bar', width: '100%' }}>
        <Label
          text={`${fileName}${processing ? ' (uploading...)' : ''}`}
          icon={fileName ? [getFileIcon(fileName), ''] : ['']}
          placeholder={placeholder}
          style={style.label}
        />
        <Txt style={style.button}>Upload</Txt>
      </Div>

      <form
        action={info.url}
        method="POST" encType="multipart/form-data"
        target={`iframe:${uploadIndex}`} ref={setFormElem}
      >

        {Object.keys(info.data).map(k =>
          <input type="hidden" name={k} value={info.data[k]} key={k} />
        )}

        {!clear &&
          <input
            name="file" type="file" onChange={onChange} onClick={onClick}
            onKeyDown={onKeyDown} style={hiddenStyle}
            id={`file:${uploadIndex}`} {...focusProps} ref={setFocusElem}
          />
        }

      </form>

      {!clear &&
        <iframe
          style={hiddenStyle} name={`iframe:${uploadIndex}`}
          src="" onLoad={onComplete} tabIndex={-1}
        />
      }

    </label>
  );
}
