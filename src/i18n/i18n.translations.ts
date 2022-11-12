import { namespaces } from "./i18n.constants";

export const en = {
    [namespaces.common]: {
      buttons: {
        ok: "Ok",
        cancel: "Cancel",
      },
    },
    [namespaces.pages.hello]: {
      welcome: "Welcome to Cultural Survival.",
      categories: "Categories",
      radio: "Radio",
      grants: "Grants"
    },
    [namespaces.pages.grants]: {
      grants_feed: "Grants Available",
      welcome: "welcome in english"
    },
  };

export const es = {
  [namespaces.common]: {
    buttons: {
      ok: "Aceptar",
      cancel: "Cancelar",
    },
  },
  [namespaces.pages.hello]: {
    welcome: "Bienvenida a Cultural Survival.",
    categories: "Categorías",
    radio: "Radio",
    grants: "Grants Feed"
  },
  [namespaces.pages.grants]: {
    grants_feed: "Subvenciones Disponibles",
    welcome: "welcome in spanish"
  },
};
