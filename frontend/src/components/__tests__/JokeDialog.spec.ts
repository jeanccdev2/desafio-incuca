import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import JokeDialog from "../JokeDialog.vue";

// Stub v-dialog to render content in-place
const globalOptions = {
  stubs: {
    VDialog: {
      template: "<div><slot /></div>",
    },
  },
};

describe("JokeDialog.vue", () => {
  it("renders joke text when provided", () => {
    const wrapper = mount(JokeDialog, {
      global: globalOptions,
      props: {
        modelValue: true,
        joke: "Why did the developer go broke? Because he used up all his cache.",
        loading: false,
        error: null,
        jokesRead: 1,
        jokesNeeded: 4,
        isFullyHappy: false,
      },
    });

    expect(wrapper.text()).toContain("Why did the developer go broke?");
    expect(wrapper.text()).toContain("Piada Geek #1");
  });

  it("renders loading state", () => {
    const wrapper = mount(JokeDialog, {
      global: globalOptions,
      props: {
        modelValue: true,
        joke: "",
        loading: true,
        error: null,
        jokesRead: 0,
        jokesNeeded: 4,
        isFullyHappy: false,
      },
    });

    expect(wrapper.text()).toContain("Buscando piada...");
  });

  it("emits fetch-joke event on button click", async () => {
    const wrapper = mount(JokeDialog, {
      global: globalOptions,
      props: {
        modelValue: true,
        joke: "A joke",
        loading: false,
        error: null,
        jokesRead: 1,
        jokesNeeded: 4,
        isFullyHappy: false,
      },
    });

    const buttons = wrapper.findAllComponents({ name: "VBtn" });
    const refreshBtn = buttons.find((b) => b.text().includes("Outra piada"));

    expect(refreshBtn).toBeDefined();
    await refreshBtn?.trigger("click");

    expect(wrapper.emitted("fetch-joke")).toBeTruthy();
  });
});
