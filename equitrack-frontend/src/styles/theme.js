export const C = {

  sidebar:      "#1C3A2E",
  sidebarBorder:"#C9A84C",
  sidebarText:  "rgba(245,240,224,0.85)",
  sidebarActive:"#C9A84C",
  
  pageBg:       "#F5F0E0",
  
  card:         "#EDE5C8",
  cardInner:    "#D8CEB0",
  cardGreen:    "#2D5A42",
  cardGreenL:   "#3D6B52",
  
  text:         "#1C3A2E",
  textFaint:    "rgba(28,58,46,0.45)",
  textMid:      "rgba(28,58,46,0.65)",
  
  gold:         "#C9A84C",
  
  healthy:      "#5A8A6A",
  injury:       "#B05A2A",
  rest:         "#8A7A4A",
  
  btnGreen:     "#2D5A42",
  btnGreenL:    "#3D6B52",
  btnRed:       "#B05A2A",
  btnBeige:     "#D8CEB0",
  white:        "#FFFFFF",
};

export const S = {
  app: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Georgia',serif",
    backgroundColor: C.pageBg,
    overflow: "hidden",
  },
  main: {
    flex: 1,
    overflow: "auto",
    padding: "28px 36px",
    backgroundColor: C.pageBg,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: C.gold,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontStyle: "italic",
    marginBottom: 20,
    fontFamily: "'Garamond','Georgia',serif",
  },
  btn: (bg = C.btnGreen, col = "#fff") => ({
    backgroundColor: bg,
    color: col,
    border: "none",
    borderRadius: 20,
    padding: "6px 16px",
    fontSize: 12,
    cursor: "pointer",
    letterSpacing: 0.5,
  }),
  input: {
    padding: "7px 14px",
    borderRadius: 8,
    border: `1px solid ${C.cardInner}`,
    backgroundColor: C.white,
    fontSize: 12,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    color: C.text,
  },
  lbl: {
    fontSize: 9,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: C.textFaint,
    marginBottom: 4,
    display: "block",
  },
  row: { display: "flex", alignItems: "center", gap: 10 },
  tag: (bg = C.btnGreen) => ({
    backgroundColor: bg,
    color: "#fff",
    fontSize: 9,
    borderRadius: 12,
    padding: "2px 9px",
    letterSpacing: 1,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  }),
};
