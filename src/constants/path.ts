export enum PATHNAME {
  home = "home",
  about = "about",
  leaderBoard = "leaderBoard",
}

export const PATH = {
  [`${PATHNAME.home}`]: "/",
  [`${PATHNAME.about}`]: "/about",
  [`${PATHNAME.leaderBoard}`]: "/leader-board",
};

export const PAGE_TITLE = {
  [`${PATHNAME.home}`]: "Trang chủ",
  [`${PATHNAME.about}`]: "About Me",
  [`${PATHNAME.leaderBoard}`]: "Leaderboard",
};
