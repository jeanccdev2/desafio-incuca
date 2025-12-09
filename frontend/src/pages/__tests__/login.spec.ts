import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import Login from "../login.vue";
import { useAuthStore } from "../../stores/auth";

const pushMock = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("login.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    expect(wrapper.text()).toContain("Melhore seu Humor");
  });

  it("calls login on valid submission", async () => {
    const wrapper = mount(Login, {
      global: {
        components: {
          "v-form": {
            template:
              "<form @submit.prevent=\"$emit('submit')\"><slot /></form>",
            emits: ["update:modelValue", "submit"],
            mounted() {
              this.$emit("update:modelValue", true);
            },
          },
        },
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const authStore = useAuthStore();
    authStore.login = vi.fn().mockResolvedValue(true);

    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');

    await emailInput.setValue("cliente@incuca.com.br");
    await passwordInput.setValue("password123");

    // Wait for v-model update
    await wrapper.vm.$nextTick();

    // Find the form and trigger submit
    const form = wrapper.find("form");
    await form.trigger("submit");

    await flushPromises();

    expect(authStore.login).toHaveBeenCalled();
  });
});
