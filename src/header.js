(() => {
  "use strict";

  const {
    HeaderBar,
    Button,
    Stack,
    StackTransitionType,
    Box,
    MenuButton,
    Builder,
    IconSize,
    Image,
  } = imports.gi.Gtk;

  function Menu() {
    const template = `
    <?xml version="1.0" encoding="UTF-8"?>
    <interface>
      <object class="GtkPopoverMenu" id="app-menu">
        <child>
          <object class="GtkBox">
            <property name="visible">True</property>
            <property name="margin">10</property>
            <child>
              <object class="GtkModelButton">
                <property name="visible">True</property>
                <property name="menu-name">tabs-position</property>
                <property name="text" translatable="yes">Tabs position</property>
              </object>
            </child>
          </object>
        </child>
        <child>
          <object class="GtkBox">
            <property name="orientation">1</property>
            <property name="visible">True</property>
            <property name="margin">10</property>
            <child>
              <object class="GtkModelButton">
                <property name="visible">True</property>
                <property name="action-name">app.tabsPosition</property>
                <property name="action-target">"top"</property>
                <property name="text" translatable="yes">Top</property>
              </object>
            </child>
            <child>
              <object class="GtkModelButton">
                <property name="visible">True</property>
                <property name="action-name">app.tabsPosition</property>
                <property name="action-target">"left"</property>
                <property name="text" translatable="yes">Left</property>
              </object>
            </child>
            <child>
              <object class="GtkModelButton">
                <property name="visible">True</property>
                <property name="action-name">app.tabsPosition</property>
                <property name="action-target">"right"</property>
                <property name="text" translatable="yes">Right</property>
              </object>
            </child>
            <child>
              <object class="GtkModelButton">
                <property name="visible">True</property>
                <property name="action-name">app.tabsPosition</property>
                <property name="action-target">"bottom"</property>
                <property name="text" translatable="yes">Bottom</property>
              </object>
            </child>
          </object>
          <packing>
            <property name="submenu">tabs-position</property>
          </packing>
        </child>
      </object>
    </interface>`;

    const builder = Builder.new_from_string(template, -1);
    const popover = builder.get_object("app-menu");

    const image = new Image({
      icon_name: "open-menu-symbolic",
      icon_size: IconSize.BUTTON,
    });
    const button = new MenuButton({
      popover,
      image,
    });

    return button;
  }

  this.Header = function Header({
    onAddTab,
    onCancel,
    onReload,
    onPrevious,
    onForward,
  }) {
    // https://gjs-docs.gnome.org/gtk30~3.24.8/gtk.headerbar
    const titlebar = new HeaderBar({
      title: "Gigagram",
      show_close_button: true,
    });

    const stack = new Stack();
    stack.set_transition_type(StackTransitionType.CROSSFADE);

    const box = new Box();
    stack.add_named(box, "tabs");
    const addTabButton = Button.new_from_icon_name(
      "tab-new-symbolic",
      IconSize.BUTTON
    );
    box.add(addTabButton);
    addTabButton.set_label("Add");
    addTabButton.set_always_show_image(true);
    addTabButton.connect("clicked", onAddTab);

    const reloadButton = Button.new_from_icon_name(
      "view-refresh-symbolic",
      IconSize.BUTTON
    );
    box.add(reloadButton);
    reloadButton.connect("clicked", onReload);

    const backButton = Button.new_from_icon_name(
      "go-previous-symbolic",
      IconSize.BUTTON
    );
    box.add(backButton);
    backButton.connect("clicked", onPrevious);

    const forwardButton = Button.new_from_icon_name(
      "go-next-symbolic",
      IconSize.BUTTON
    );
    box.add(forwardButton);
    forwardButton.connect("clicked", onForward);

    const cancelButton = Button.new_with_label("Cancel");
    cancelButton.connect("clicked", onCancel);
    stack.add_named(cancelButton, "services");

    stack.add_named(new Box(), "none");

    titlebar.pack_start(stack);

    const menu = Menu();
    titlebar.pack_end(menu);

    return { titlebar, stack };
  };
})();
