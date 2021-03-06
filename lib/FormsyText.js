'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsyText = (0, _createReactClass2.default)({

  propTypes: {
    convertValue: _propTypes2.default.func,
    defaultValue: _propTypes2.default.any,
    name: _propTypes2.default.string.isRequired,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onKeyDown: _propTypes2.default.func,
    requiredError: _propTypes2.default.string,
    underlineFocusStyle: _propTypes2.default.object,
    underlineStyle: _propTypes2.default.object,
    updateImmediately: _propTypes2.default.bool,
    useValidationColor: _propTypes2.default.bool,
    validationColor: _propTypes2.default.string,
    validationError: _propTypes2.default.string,
    validationErrors: _propTypes2.default.object,
    validations: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    value: _propTypes2.default.any
  },

  mixins: [_formsyReact2.default.Mixin],

  getDefaultProps: function getDefaultProps() {
    return {
      underlineFocusStyle: {},
      underlineStyle: {},
      useValidationColor: true,
      validationColor: '#4CAF50'
    };
  },
  getInitialState: function getInitialState() {
    var value = this.controlledValue();
    return { value: value };
  },
  componentWillMount: function componentWillMount() {
    this.setValue(this.controlledValue());
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var isValueChanging = nextProps.value !== this.props.value;
    if (isValueChanging || nextProps.defaultValue !== this.props.defaultValue) {
      var value = this.controlledValue(nextProps);
      var isValid = this.isValidValue(value);

      if (isValueChanging || this.props.defaultValue === this.getValue()) {
        this.setState({ value: value, isValid: isValid });
        if (this.getValue() !== value) this.setValue(value);
      }
    }
  },
  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (nextState._isPristine && // eslint-disable-line no-underscore-dangle
    nextState._isPristine !== this.state._isPristine) {
      // eslint-disable-line no-underscore-dangle
      // Calling state here is valid, as it cannot cause infinite recursion.
      var value = this.controlledValue(nextProps);
      var isValid = this.isValidValue(value);
      this.setValue(value);
      this.setState({ value: value, isValid: isValid });
    }
  },
  controlledValue: function controlledValue() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

    return props.value || props.defaultValue || this.convertValue('');
  },
  handleBlur: function handleBlur(event) {
    this.setValue(this.convertValue(event.currentTarget.value));
    delete this.changeValue;
    if (this.props.onBlur) this.props.onBlur(event);
  },
  handleChange: function handleChange(event) {
    // Update the value (and so display any error) after a timeout.
    if (this.props.updateImmediately) {
      if (!this.changeValue) {
        this.changeValue = (0, _utils.debounce)(this.setValue, 400);
      }
      this.changeValue(this.convertValue(event.currentTarget.value));
    } else {
      // If there was an error (on loss of focus) update on each keypress to resolve same.
      if (this.getErrorMessage() != null) {
        this.setValue(this.convertValue(event.currentTarget.value));
      } else {
        // Only update on valid values, so as to not generate an error until focus is lost.
        if (this.isValidValue(event.target.value)) {
          this.setValue(this.convertValue(event.currentTarget.value));
          // If it becomes invalid, and there isn't an error message, invalidate without error.
        }
      }
    }

    // Controlled component
    this.setState({ value: event.currentTarget.value, isValid: this.isValidValue(event.currentTarget.value) });
    if (this.props.onChange) this.props.onChange(event, event.currentTarget.value);
  },
  handleKeyDown: function handleKeyDown(event) {
    if ((0, _keycode2.default)(event) === 'enter') this.setValue(this.convertValue(event.currentTarget.value));
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },
  convertValue: function convertValue(value) {
    if (this.props.convertValue) {
      return this.props.convertValue(value);
    } else {
      return value;
    }
  },


  setMuiComponentAndMaybeFocus: _utils.setMuiComponentAndMaybeFocus,

  render: function render() {
    var _props = this.props,
        defaultValue = _props.defaultValue,
        convertValue = _props.convertValue,
        requiredError = _props.requiredError,
        underlineFocusStyle = _props.underlineFocusStyle,
        underlineStyle = _props.underlineStyle,
        updateImmediately = _props.updateImmediately,
        validations = _props.validations,
        validationError = _props.validationError,
        validationErrors = _props.validationErrors,
        value = _props.value,
        useValidationColor = _props.useValidationColor,
        validationColor = _props.validationColor,
        rest = _objectWithoutProperties(_props, ['defaultValue', 'convertValue', 'requiredError', 'underlineFocusStyle', 'underlineStyle', 'updateImmediately', 'validations', 'validationError', 'validationErrors', 'value', 'useValidationColor', 'validationColor']);

    var isRequired = this.isRequired,
        isPristine = this.isPristine,
        isValid = this.isValid,
        isFormSubmitted = this.isFormSubmitted;

    var isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    var errorText = this.getErrorMessage() || isRequiredError;

    return _react2.default.createElement(_TextField2.default, _extends({
      disabled: this.isFormDisabled()
    }, rest, {
      errorText: errorText,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      ref: this.setMuiComponentAndMaybeFocus,
      value: this.state.value,
      underlineStyle: useValidationColor && this.state.isValid ? { borderColor: validationColor } : underlineStyle,
      underlineFocusStyle: useValidationColor && this.state.isValid ? { borderColor: validationColor } : underlineFocusStyle
    }));
  }
});

exports.default = FormsyText;