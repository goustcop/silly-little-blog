import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

const repoRoot = path.join(__dirname, "..", "..", "..");
const componentPath = path.join(
  repoRoot,
  "src",
  "site",
  "_includes",
  "components",
  "user",
  "sidebar",
  "bottom",
  "spotify-player.njk"
);
const stylePath = path.join(
  repoRoot,
  "src",
  "site",
  "styles",
  "user",
  "spotify-player.scss"
);

describe("Spotify sidebar player", () => {
  it("renders the selected playlist through the global sidebar extension", () => {
    expect(fs.existsSync(componentPath)).toBe(true);

    const component = fs.readFileSync(componentPath, "utf8");
    expect(component).toContain(
      'src="https://open.spotify.com/embed/playlist/4WbshwHrFtz7dYt6KncEGF?utm_source=generator&amp;theme=0&amp;si=ea8b8ede537c4f9f"'
    );
    expect(component).toContain('title="Spotify playlist player"');
    expect(component).toContain(
      'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"'
    );
    expect(component).not.toContain("@url:");
  });

  it("ships responsive component styling", () => {
    expect(fs.existsSync(stylePath)).toBe(true);

    const styles = fs.readFileSync(stylePath, "utf8");
    expect(styles).toContain(".spotify-sidebar-player");
    expect(styles).toContain("width: 100%");
  });
});
