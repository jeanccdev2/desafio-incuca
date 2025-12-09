import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import Feliz from "../feliz.vue";
import Triste from "../triste.vue";
import Inicial from "../inicial.vue";

// Mock useRouter for all
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Pages Snapshot/Render", () => {
  it("Feliz renders", () => {
    const wrapper = mount(Feliz, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.findComponent({ name: "MoodCard" }).exists()).toBe(true);
  });

  it("Triste renders", () => {
    const wrapper = mount(Triste, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.findComponent({ name: "MoodCard" }).exists()).toBe(true);
  });

  it("Inicial renders", () => {
    const wrapper = mount(Inicial, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.findComponent({ name: "MoodCard" }).exists()).toBe(true);
  });
});
