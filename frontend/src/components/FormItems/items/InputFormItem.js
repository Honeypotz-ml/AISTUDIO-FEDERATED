import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'components/FormItems/formErrors';
import { FastField } from 'formik';
import TextField from '@mui/material/TextField';
import { Editor } from '@tinymce/tinymce-react';

const InputFormItem = (props) => {
  const {
    name,
    schema,
    hint,
    size,
    password,
    placeholder,
    autoFocus,
    autoComplete,
    inputProps,
    errorMessage,
    multiline,
    wysiwyg,
    required = false,
  } = props;

  const { label } = schema[name];

  return (
    <FastField name={name}>
      {({ form }) => {
        if (!wysiwyg) {
          return (
            <>
              <TextField
                id='outlined-basic'
                variant='outlined'
                fullWidth
                label={label}
                multiline={multiline}
                rows={multiline && 4}
                onChange={(event) => {
                  const errors = FormErrors.validateStatus(
                    form,
                    name,
                    errorMessage,
                  );
                  form.setFieldValue(name, event.target.value);
                  form.setFieldTouched(name);
                }}
                value={form.values[name] || ''}
                placeholder={placeholder || undefined}
                autoFocus={autoFocus || undefined}
                autoComplete={autoComplete || undefined}
                error={FormErrors.validateStatus(form, name, errorMessage)}
                {...inputProps}
              />
              <div className='invalid-feedback'>
                {FormErrors.displayableError(form, name, errorMessage)}
              </div>
              {!!hint && <small className='form-text text-muted'>{hint}</small>}
            </>
          );
        } else {
          return (
            <>
              <Editor
                onEditorChange={(value) => {
                  const errors = FormErrors.validateStatus(
                    form,
                    name,
                    errorMessage,
                  );
                  form.setFieldValue(name, value);
                  form.setFieldTouched(name);
                }}
                value={form.values[name] || ''}
                apiKey={'s0bs8snu2u6qo8skn5r3kurkerhbaagpsgm9cdkbxnbo8nj4'}
              />
            </>
          );
        }
      }}
    </FastField>
  );
};

InputFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  inputProps: PropTypes.object,
};

export default InputFormItem;
