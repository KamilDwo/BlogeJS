import React from 'react'

const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: () => {}
});

export default LanguageContext
