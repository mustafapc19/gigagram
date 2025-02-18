#!/bin/sh

export DEV=true

# services
glib-compile-resources --target=data/re.sonny.gigagram.services.gresource --sourcedir=src/ src/re.sonny.gigagram.services.gresource.xml

# settings
glib-compile-schemas --strict data/
export GSETTINGS_SCHEMA_DIR=./data

# notifications
# FIXME add Exec=gjs /home/sonny/Projects/gigagram/src/dev.js
# cp data/re.sonny.gigagram.desktop.in ~/.local/share/applications/re.sonny.gigagram.desktop
# update-desktop-database

gjs ./src/dev.js
