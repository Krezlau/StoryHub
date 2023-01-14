import {DefaultTheme} from "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string,
    headerColor: string,
    buttonColor: string,
    buttonHoverColor: string,
    titleColor: string,
    textColor: string,
    linkColor: string,
    navLinkActiveColor: string,
    standardBorderRadius: string,
    mainContentFontSize: string,
    headerFontSize: string,
    storyCardBgColor: string,
    storyCardTextColor: string,
    storyCardLinkColor: string,
    storyCardLinkHoverColor: string,
  }
}

export const DarkMode: DefaultTheme = {
  bgColor: '#3f3f3f',
  headerColor: '#51f1f1',
  buttonColor: '#0b4545',
  buttonHoverColor: '#126e6e',
  titleColor: 'black',
  textColor: '#e6fcfc',
  linkColor: '#51f1f1',
  navLinkActiveColor: '#0dc2c2',
  standardBorderRadius: '20px',
  mainContentFontSize: '1.15rem',
  headerFontSize: '1.25rem',
  storyCardBgColor: 'white',
  storyCardTextColor: 'black',
  storyCardLinkColor: '#065959',
  storyCardLinkHoverColor: '#0a8d8d',
}

export const LightMode: DefaultTheme = {
  bgColor: '#e6fcfc',
  headerColor: '#51f1f1',
  buttonColor: '#51f1f1',
  buttonHoverColor: '#0dc2c2',
  titleColor: 'black',
  textColor: 'black',
  linkColor: '#0a8d8d',
  navLinkActiveColor: '#0dc2c2',
  standardBorderRadius: '20px',
  mainContentFontSize: '1.25rem',
  headerFontSize: '1.25rem',
  storyCardBgColor: '#6989ff',
  storyCardTextColor: 'black',
  storyCardLinkColor: '#51f1f1',
  storyCardLinkHoverColor: '#0dc2c2',
}