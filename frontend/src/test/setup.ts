import { config } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import ResizeObserver from "resize-observer-polyfill";

window.ResizeObserver = ResizeObserver;

const vuetify = createVuetify({
  components,
  directives,
});

config.global.plugins = [vuetify];

// Mock do window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
