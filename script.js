const menu = document.querySelector(".menu");
const nav = document.querySelector("#nav");
const mobile = window.matchMedia("(max-width: 760px)");

function setMenu(open) {
  menu.setAttribute("aria-expanded", String(open));
  nav.hidden = mobile.matches && !open;
}

function syncNavigation() {
  menu.hidden = !mobile.matches;
  if (mobile.matches && nav.contains(document.activeElement)) menu.focus();
  setMenu(false);
}

syncNavigation();
mobile.addEventListener("change", syncNavigation);
menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") === "false"));
nav.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!mobile.matches || !link) return;

  const section = document.querySelector(link.hash);
  section.tabIndex = -1;
  section.focus({ preventScroll: true });
  setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || menu.getAttribute("aria-expanded") !== "true") return;
  setMenu(false);
  menu.focus();
});

if (window.gsap) {
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    gsap.from(".hero-copy > *", {
      opacity: 0, y: 15, duration: 0.58, stagger: 0.06, ease: "power2.out",
      clearProps: "opacity,transform",
    });
    gsap.from(".hero-photo", {
      opacity: 0, y: 12, duration: 0.65, ease: "power2.out",
      clearProps: "opacity,transform",
    });
  });
}
