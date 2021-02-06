/***
 * Contains basic SlickGrid editors.
 * @module Editors
 * @namespace Slick
 */

(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Editors": {
        "Text": TextEditor,
        "Integer": IntegerEditor,
        "Date": DateEditor,
        "YesNoSelect": YesNoSelectEditor,
        "Checkbox": CheckboxEditor,
        "PercentComplete": PercentCompleteEditor,
        "LongText": LongTextEditor,
        "DropDownList": DropDownListEditor
      }
    }
  });

  function TextEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />")
          .appendTo(args.container)
          .bind("keydown.nav", function (e) {
            if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
              e.stopImmediatePropagation();
            }
          })
          .focus()
          .select();
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.getValue = function () {
      return $input.val();
    };

    this.setValue = function (val) {
      $input.val(val);
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field] || "";
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (args.column.validator) {
        var validationResults = args.column.validator($input.val());
        if (!validationResults.valid) {
          return validationResults;
        }
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function IntegerEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />");

      $input.bind("keydown.nav", function (e) {
        if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
          e.stopImmediatePropagation();
        }
      });

      $input.appendTo(args.container);
      $input.focus().select();
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return parseInt($input.val(), 10) || 0;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (isNaN($input.val())) {
        return {
          valid: false,
          msg: "Please enter a valid integer"
        };
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function DateEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;
    var calendarOpen = false;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />");
      $input.appendTo(args.container);
      $input.focus().select();
      $input.datepicker({
        showOn: "button",
        buttonImageOnly: true,
        buttonImage: "../images/calendar.gif",
        beforeShow: function () {
          calendarOpen = true
        },
        onClose: function () {
          calendarOpen = false
        }
      });
      $input.width($input.width() - 18);
    };

    this.destroy = function () {
      $.datepicker.dpDiv.stop(true, true);
      $input.datepicker("hide");
      $input.datepicker("destroy");
      $input.remove();
    };

    this.show = function () {
      if (calendarOpen) {
        $.datepicker.dpDiv.stop(true, true).show();
      }
    };

    this.hide = function () {
      if (calendarOpen) {
        $.datepicker.dpDiv.stop(true, true).hide();
      }
    };

    this.position = function (position) {
      if (!calendarOpen) {
        return;
      }
      $.datepicker.dpDiv
          .css("top", position.top + 30)
          .css("left", position.left);
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function YesNoSelectEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");
      $select.appendTo(args.container);
      $select.focus();
    };

    this.destroy = function () {
      $select.remove();
    };

    this.focus = function () {
      $select.focus();
    };

    this.loadValue = function (item) {
      $select.val((defaultValue = item[args.column.field]) ? "yes" : "no");
      $select.select();
    };

    this.serializeValue = function () {
      return ($select.val() == "yes");
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return ($select.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function CheckboxEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
      $select.appendTo(args.container);
      $select.focus();
    };

    this.destroy = function () {
      $select.remove();
    };

    this.focus = function () {
      $select.focus();
    };

    this.loadValue = function (item) {
      defaultValue = !!item[args.column.field];
      if (defaultValue) {
        $select.attr("checked", "checked");
      } else {
        $select.removeAttr("checked");
      }
    };

    this.serializeValue = function () {
      return !!$select.attr("checked");
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (this.serializeValue() !== defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function PercentCompleteEditor(args) {
    var $input, $picker;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-percentcomplete' />");
      $input.width($(args.container).innerWidth() - 25);
      $input.appendTo(args.container);

      $picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
      $picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");

      $picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");

      $input.focus().select();

      $picker.find(".editor-percentcomplete-slider").slider({
        orientation: "vertical",
        range: "min",
        value: defaultValue,
        slide: function (event, ui) {
          $input.val(ui.value)
        }
      });

      $picker.find(".editor-percentcomplete-buttons button").bind("click", function (e) {
        $input.val($(this).attr("val"));
        $picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
      })
    };

    this.destroy = function () {
      $input.remove();
      $picker.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      $input.val(defaultValue = item[args.column.field]);
      $input.select();
    };

    this.serializeValue = function () {
      return parseInt($input.val(), 10) || 0;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
    };

    this.validate = function () {
      if (isNaN(parseInt($input.val(), 10))) {
        return {
          valid: false,
          msg: "Please enter a valid positive number"
        };
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  /*
   * An example of a "detached" editor.
   * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
   * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
   */
  function LongTextEditor(args) {
    var $input, $wrapper;
    var defaultValue;
    var scope = this;

    this.init = function () {
      var $container = $("body");

      $wrapper = $("<DIV class='grid-long-text' style='z-index:100000000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px; color:black'/>")
          .appendTo($container);

      $input = $("<TEXTAREA hidefocus rows=5 style='background:white;width:250px;height:80px;border:0;outline:0'>")
          .appendTo($wrapper);

      $("<DIV style='text-align:right'><div class='app-button app-button-middle app-button-gray'>取消</div><div class='app-button app-button-middle app-button-gray'>确定</div></DIV>")
          .appendTo($wrapper);

      $wrapper.find(".app-button:last").bind("click", this.save);
      $wrapper.find(".app-button:first").bind("click", this.cancel);
      $input.bind("keydown", this.handleKeyDown);

      scope.position(args.position);
      $input.focus().select();
    };

    this.handleKeyDown = function (e) {
      if (e.which == $.ui.keyCode.ENTER && e.ctrlKey) {
        scope.save();
      } else if (e.which == $.ui.keyCode.ESCAPE) {
        e.preventDefault();
        scope.cancel();
      } else if (e.which == $.ui.keyCode.TAB && e.shiftKey) {
        e.preventDefault();
        args.grid.navigatePrev();
      } else if (e.which == $.ui.keyCode.TAB) {
        e.preventDefault();
        args.grid.navigateNext();
      }
    };

    this.save = function () {
      args.commitChanges();
    };

    this.cancel = function () {
      $input.val(defaultValue);
      args.cancelChanges();
    };

    this.hide = function () {
      $wrapper.hide();
    };

    this.show = function () {
      $wrapper.show();
    };

    this.position = function (position) {
      $wrapper
          .css("top", position.top - 5)
          .css("left", position.left - 5)
    };

    this.destroy = function () {
      $wrapper.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      $input.val(defaultValue = item[args.column.field]);
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function DropDownListEditor(args) {  
        var $select = $("");  
        var defaultValue = "";  
        var scope = this;  
        var dataSouce = args.column.$selDropdownlistDatasource;  
        var changedEvent = args.column.$selDropdownlistChangedEvent;  
  
        this.init = function () {  
            if (dataSouce != undefined && dataSouce != null) {  
                $select = this.preRender(args.column.$selDropdownlistDatasource);  
                if (changedEvent != null)  
                    $select.change(function () {  
                        changedEvent(this, { "ID": $select.val(), "txt": $select.find('option:selected').text() });  
                    });  
  
                $select.appendTo(args.container);  
                $select.focus();  
            }              
        };  
  
        this.preRender = function (dataSource) {  
            var option_str = "";  
            var preSelect = "<SELECT tabIndex='0' class='editor-select'><OPTION value='-1'></OPTION>";  
            var endSelect = "</SELECT>";  
              
            var len = dataSource.length;  
            if (len > 0 && dataSource[0].txt != undefined) {  
                for (var i = 0; i < len; i++)  
                    option_str += "<OPTION value='" + dataSource[i].ID + "'>" + dataSource[i].txt + "</OPTION>";  
            }  
            else {  
                for (var i = 0; i < len; i++)  
                    option_str += "<OPTION value='" + dataSource[i].ID + "'>" + dataSource[i].Text + "</OPTION>";  
            }  
  
            var list = preSelect + option_str + endSelect;  
            return $(list);  
        }  
  
        this.destroy = function () {  
            $(args.container).empty();  
        };  
  
        this.focus = function () {  
            $select.focus();  
        };  
  
        this.serializeValue = function () {  
            if ($select.val() != -1) {  
                return $select.find('option:selected').text();  
            }  
        };  
  
        this.applyValue = function (item, state) {  
            if (state != undefined) {
                item[args.column.id] = $select.val(); 
                item[args.column.field] = state;  
            }  
        };  
  
        this.loadValue = function (item) {  
            defaultValue = item[args.column.field];
            $select.val(item[args.column.id]);
            $select[0].defaultValue = defaultValue;
            $select.select();
        };  
  
        this.isValueChanged = function () {  
            return ($select.val() != defaultValue);  
        };  
  
        this.validate = function () {  
            return {  
                valid: true,  
                msg: null  
            };  
        };  

        this.init(); 
    }  

})(jQuery);
