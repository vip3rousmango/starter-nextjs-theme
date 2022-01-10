import { defineDocumentType } from 'contentlayer/source-files';

// TODO remove as it's only used by tailwind
export const ThemeStyle = defineDocumentType(() => ({
  name: 'ThemeStyle',
  fields: {
    fontHeadlines: {
      type: 'enum',
      options: ['sans', 'sansAlt']
    },
    h1: { type: 'json' },
    h2: { type: 'json' },
    h3: { type: 'json' },
    h4: { type: 'json' },
    h5: { type: 'json' },
    h6: { type: 'json' },
    fontBody: { type: 'string' },
    main: { type: 'string' },
    light: { type: 'string' },
    onLight: { type: 'string' },
    dark: { type: 'string' },
    onDark: { type: 'string' },
    primary: { type: 'string' },
    onPrimary: { type: 'string' },
    secondary: { type: 'string' },
    onSecondary: { type: 'string' },
    complementary: { type: 'string' },
    onComplementary: { type: 'string' },
    buttonPrimary: { type: 'json' },
    buttonSecondary: { type: 'json' },
    link: { type: 'json' }
  }
}));
