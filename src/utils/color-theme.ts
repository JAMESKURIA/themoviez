import { vars } from 'nativewind'

export const appColors = {
    light: {
        '--color-primary-default': '#FCFDFD',
        '--color-primary-light': '#E6ECEC',
        '--color-secondary-default': '#9b6cca',
        '--color-secondary-light': '#dfbeff',
        '--color-tertiary-default': '#ff88bd',
        '--color-tertiary-light': '#ffc2e6',
        '--color-accent-default': '#1E1E1E',
        '--color-accent-light': '#070707',
        '--color-grey-default': '#979797',
        '--color-slate-default': '#38383a',
        '--color-dark-default': '#1f355b',
        '--color-light-default': '#FCFDFD',
        '--color-overlay': 'rgba(0, 0, 0, .05)',
    },
    dark: {
        '--color-primary-default': '#0e0e11',
        '--color-primary-light': '#1a1b1d',
        '--color-secondary-default': '#9b6cca',
        '--color-secondary-light': '#dfbeff',
        '--color-tertiary-default': '#ff88bd',
        '--color-tertiary-light': '#ffc2e6',
        '--color-accent-default': '#ffffff',
        '--color-accent-light': '#acadaf',
        '--color-grey-default': '#979797',
        '--color-slate-default': '#38383a',
        '--color-dark-default': '#1f355b',
        '--color-light-default': '#1E1E1E',
        '--color-overlay': 'rgba(255, 255, 255, .05)',
    },
}

export const themes = {
    light: vars({ ...appColors.light }),
    dark: vars({ ...appColors.dark }),
}
