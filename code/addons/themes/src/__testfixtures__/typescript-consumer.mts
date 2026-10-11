import addonThemes, { withThemeByClassName } from '@storybook/addon-themes';

addonThemes();
withThemeByClassName({ themes: { light: 'light', dark: 'dark' }, defaultTheme: 'light' });
