function hashCode(str) {
  // Simple hash function to convert string to numeric value
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i){
  // Convert integer to RGB color
  let c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
}

export function generateColor(name) {
  let hash = hashCode(name);
  let color = intToRGB(hash);

  // Ensure the color has good contrast with white text
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);
  let brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // If brightness is too high, invert the color for better contrast
  if (brightness > 150) {
      r = 255 - r;
      g = 255 - g;
      b = 255 - b;
  }

  return `rgb(${r},${g},${b})`;
}

export function extractThemeColorsFromDOM() {
	const computedStyles = getComputedStyle(document.querySelector(':root'));
	return {
		primary: `oklch(${computedStyles.getPropertyValue('--p')})`,
		primaryFocus: `oklch(${computedStyles.getPropertyValue('--pf')})`,
		primaryContent: `oklch(${computedStyles.getPropertyValue('--pc')})`,
		secondary: `oklch(${computedStyles.getPropertyValue('--s')})`,
		secondaryFocus: `oklch(${computedStyles.getPropertyValue('--sf')})`,
		secondaryContent: `oklch(${computedStyles.getPropertyValue('--sc')})`,
		accent: `oklch(${computedStyles.getPropertyValue('--a')})`,
		accentFocus: `oklch(${computedStyles.getPropertyValue('--af')})`,
		accentContent: `oklch(${computedStyles.getPropertyValue('--ac')})`,
		neutral: `oklch(${computedStyles.getPropertyValue('--n')})`,
		neutralFocus: `oklch(${computedStyles.getPropertyValue('--nf')})`,
		neutralContent: `oklch(${computedStyles.getPropertyValue('--nc')})`,
		base100: `oklch(${computedStyles.getPropertyValue('--b1')})`,
		base200: `oklch(${computedStyles.getPropertyValue('--b2')})`,
		base300: `oklch(${computedStyles.getPropertyValue('--b3')})`,
		baseContent: `oklch(${computedStyles.getPropertyValue('--bc')})`,
		info: `oklch(${computedStyles.getPropertyValue('--in')})`,
		infoContent: `oklch(${computedStyles.getPropertyValue('--inc')})`,
		success: `oklch(${computedStyles.getPropertyValue('--su')})`,
		successContent: `oklch(${computedStyles.getPropertyValue('--suc')})`,
		warning: `oklch(${computedStyles.getPropertyValue('--wa')})`,
		warningContent: `oklch(${computedStyles.getPropertyValue('--wac')})`,
		error: `oklch(${computedStyles.getPropertyValue('--er')})`,
		errorContent: `oklch(${computedStyles.getPropertyValue('--erc')})`,
	};
}

export function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}

export function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

export function hslToHex(h, s, l) {
  const [r, g, b] = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}
