import theme from '../styles/theme';

type ThemeType = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}
// export default styled as CreateStyled<typeof theme>;
