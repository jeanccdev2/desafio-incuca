import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import MoodCard from "../MoodCard.vue";

describe("MoodCard.vue", () => {
  it("renders correctly with given props", () => {
    const wrapper = mount(MoodCard, {
      props: {
        emoji: "🧪",
        title: "Testing",
        description: "Unit testing is fun",
        happiness: 42,
        progressColor: "primary",
      },
    });

    expect(wrapper.text()).toContain("Testing");
    expect(wrapper.text()).toContain("Unit testing is fun");
    // Check if progress bar has correct value (might need to check props of v-progress-linear if it's a stub, or DOM if real)
    // Since we use real vuetify in setup, it renders. But querying it might be deep.
    // Simple text assertion is good for now.
    expect(wrapper.text()).toContain("42%");
  });

  it("renders default slot content", () => {
    const wrapper = mount(MoodCard, {
      props: {
        emoji: "🧪",
        title: "Testing",
        description: "Slot test",
        happiness: 0,
      },
      slots: {
        default: '<div class="test-slot">Extra Content</div>',
      },
    });

    expect(wrapper.find(".test-slot").exists()).toBe(true);
    expect(wrapper.text()).toContain("Extra Content");
  });

  it("applies custom classes", () => {
    const wrapper = mount(MoodCard, {
      props: {
        emoji: "x",
        title: "x",
        description: "x",
        happiness: 0,
        cardClass: "custom-card-class",
        emojiClass: "custom-emoji-class",
      },
    });

    expect(wrapper.html()).toContain("custom-card-class");
    expect(wrapper.html()).toContain("custom-emoji-class");
  });
});
