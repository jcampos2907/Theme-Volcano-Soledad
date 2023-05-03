$(function () {
  $.widget("custom.flagmenu", $.ui.selectmenu, {
    _renderItem: function (ul, item) {
      var li = $("<li>"),
        wrapper = $("<div>", { text: item.label });

      if (item.disabled) {
        li.addClass("ui-state-disabled");
      }
      let value = { code: ' ' }
      if (item.value) {
        try {
          value = JSON.parse(item.value)
        } catch (error) {

        }
      }
      $("<span>", {
        text: value.code || " ",
        "class": "code"
      })
        .appendTo(wrapper);

      $("<span>", {
        style: item.element.attr("data-style"),
        "class": "ui-flag " + item.element.attr("data-class")
      })
        .appendTo(wrapper);

      return li.append(wrapper).appendTo(ul);
    },
    _renderButtonItem: function (item) {
      var buttonItem = $("<span>", {
        "class": "ui-selectmenu-text"
      })
      if (item.value) {
        const value = JSON.parse(item.value)
        this._setText(buttonItem, 'place');
        buttonItem.css("background-image", `url(${value.image})`)


      }
      else {
        this._setText(buttonItem, item.label);
      }
      buttonItem.addClass('no-text')

      return buttonItem;
    }
  });
  $.widget("custom.iconselectmenu", $.ui.selectmenu, {
    _renderItem: function (ul, item) {
      var li = $("<li>"),
        wrapper = $("<div>", { text: item.label });

      if (item.disabled) {
        li.addClass("ui-state-disabled");
      }

      let value = { code: ' ' }
      if (item.value) {
        try {
          value = JSON.parse(item.value)
        } catch (error) {
        }
      }
      $("<span>", {
        text: `(${value.code})` || " ",
        "class": "code"
      })
        .appendTo(wrapper);

      $("<span>", {
        style: item.element.attr("data-style"),
        "class": "ui-flag " + item.element.attr("data-class")
      })
        .appendTo(wrapper);

      return li.append(wrapper).appendTo(ul);
    },
    _renderButtonItem: function (item) {
      let value = { code: item.label }
      if (item.value) {
        try {
          value = JSON.parse(item.value)
        } catch (error) {
        }
      }
      var buttonItem = $("<span>", {
        "class": "ui-selectmenu-text"
      })
      this._setText(buttonItem, value.code);
      return buttonItem;
    }
  });

  $('.select_normal').selectmenu({
    icons: { button: "ui-icon-caret-1-s" },
    change: function (event, data) {
      removeSelectErrors(data.item.element)
    }
  })
  $('.genero').selectmenu({
    icons: { button: "ui-icon-caret-1-s" },
    change: function (event, data) {
      removeSelectErrors(data.item.element)
      setGenero(data.item.value),
        hideTallas(data.item.value)

    }
  })
  initializeIdInputs($('.nacionalidad'))
  intializePhoneInputs($('.codigo_telefono'))
});