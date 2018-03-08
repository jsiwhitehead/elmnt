import * as React from 'react';
import m from 'mishmash';
import st from 'style-transform';

import css from '../../css';
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

export default m
  .stream((observe, push) => {
    let form;
    let input;
    let focusOnReset = false;
    let successful = false;
    let prevValue;

    push({
      fileName: null,
      formInfo: null,
      resetDOM: false,
      uploadIndex: counter++,
    });

    const resetForm = () => {
      focusOnReset = document.activeElement === input;
      push({ fileName: null, formInfo: null, resetDOM: true }, () =>
        push({ resetDOM: false }),
      );
    };

    observe('value', value => {
      const { $fileName } = observe();
      if (value || !$fileName) resetForm();
    });

    const setValue = newValue => {
      const { value, onChange } = observe();
      push({ fileName: null });
      if (newValue !== value) onChange(newValue);
      else resetForm();
    };

    push({
      onClear: () => setValue(null),
      onClick: event => {
        const { $fileName } = observe();
        if ($fileName) {
          setValue(prevValue);
          event.preventDefault();
        }
      },
      onChange: async () => {
        const { value, onChange, config, maxKb, fileType } = observe();
        if (input.value) {
          if (checkFile(input.files, input.value, maxKb, fileType)) {
            successful = false;
            prevValue = value;
            const fileName = input.value
              .split('/')
              .pop()
              .split('\\')
              .pop();
            push({ fileName });
            onChange(null);
            push(
              {
                formInfo: await uploaders[config.uploader](
                  config,
                  observe(),
                  fileName,
                ),
              },
              () => form.submit(),
            );
          }
        }
      },
      onFrameLoad: () => {
        const { $fileName, $formInfo } = observe();
        if ($fileName) {
          setTimeout(() => {
            if (successful) {
              setValue(`${$formInfo.fileId}:${$fileName}`);
            } else {
              setValue(prevValue);
              alert(
                "Upload failed. It's likely that the file you chose is too big, please try again",
              );
            }
          });
        }
      },
      onKeyDown: event => {
        if (event.keyCode === 13 || event.keyCode === 32) {
          input.click();
          event.preventDefault();
        }
      },
      setFormElem: c => (form = c),
      setFocusElem: c => {
        const { setFocusElem } = observe();
        input = c;
        setFocusElem(c);
        if (input && focusOnReset) {
          input.focus();
          setTimeout(() => input && input.focus());
          focusOnReset = false;
        }
      },
    });

    const onWindowMessage = event => {
      const { config, $uploadIndex } = observe();
      if (
        config.serverUrl.startsWith(event.origin) &&
        event.data === $uploadIndex
      ) {
        successful = true;
      }
    };
    if (typeof document !== 'undefined') {
      window.addEventListener('message', onWindowMessage);
      return () => window.removeEventListener('message', onWindowMessage);
    }
  })
  .merge('value', 'fileName', (value, fileName) => ({
    fileName: value ? value.split(/\:(.+)$/)[1] : fileName || '',
    processing: !!fileName,
  }))
  .merge(
    'style',
    'isFocused',
    'processing',
    (style, isFocused, processing) => ({
      style: {
        base: st(style)
          .filter(...css.groups.other)
          .merge({ cursor: 'pointer' }),
        label: st(style)
          .mergeKeys({ active: isFocused, processing })
          .filter(...css.groups.text, ...css.groups.box)
          .merge({
            borderRightWidth: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }),
        button: st(style)
          .mergeKeys({ active: isFocused, button: true })
          .filter(...css.groups.text, ...css.groups.box, 'width')
          .merge({ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
      },
    }),
  )(
  ({
    fileName,
    processing,
    uploadIndex,
    placeholder,
    formInfo,
    resetDOM,
    onClear,
    onClick,
    onChange,
    onFrameLoad,
    onKeyDown,
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
        action={formInfo && formInfo.url}
        method="POST"
        encType="multipart/form-data"
        target={`iframe:${uploadIndex}`}
        ref={setFormElem}
      >
        {formInfo &&
          Object.keys(formInfo.data).map(k => (
            <input type="hidden" name={k} value={formInfo.data[k]} key={k} />
          ))}

        {!resetDOM && (
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

      {!resetDOM && (
        <iframe
          style={hiddenStyle}
          name={`iframe:${uploadIndex}`}
          src=""
          onLoad={onFrameLoad}
          tabIndex={-1}
        />
      )}
    </label>
  ),
);
