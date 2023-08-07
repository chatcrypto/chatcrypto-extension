import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
  paperStyle: {
    backgroundColor: theme.colors.primary[0],
    padding: '12px 24px',
  },
  secondaryPaperStyle: {
    backgroundColor: theme.colors.background[0],
    padding: '12px 24px',
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'hidden',
    wordBreak: 'break-all',
  },
  primaryTextStyle: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#FFFFFF',
    wordBreak: 'break-all',
  },
  secondaryTextStyle: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    color: '#353535',
    whiteSpace: 'pre-line',
    wordBreak: 'break-all',
  },
  textStyle: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '24px',
    color: '#353535',
    whiteSpace: 'pre-line',
    wordBreak: 'break-all',
  },
  errorPaperStyle: {
    border: `1px solid ${theme.colors.red[7]}`,
    display: 'flex',
    backgroundColor: theme.colors.background[0],
    padding: '12px 24px',
    position: 'relative',
    alignItems: 'center',
    gap: '4px',
  },
  errorTextStyle: {
    fontSize: '14px',
    fontWeight: 400,
    color: theme.colors.red[7],
  },
  errorIcon: {
    width: '16px',
    height: '16px',
    '&:hover': {
      cursor: 'pointer',
    },
    color: theme.colors.red[7],
  },
  referenceText: {
    fontSize: '12px',
    color: '#353535',
    lineHeight: '14px',
  },
  titleText: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#353535',
    lineHeight: '28px',
    wordBreak: 'break-all',
  },
  tableWrapper: {
    marginTop: '16px',
    maxWidth: '100%',
    overflowX: 'scroll',
    '@media (max-width: 1100px)': {
      whiteSpace: 'nowrap',
      overflowX: 'scroll',
      overflowY: 'hidden',
    },
  },
  table: {
    borderCollapse: 'separate',
    borderSpacing: 0,
    minWidth: '900px',
    maxWidth: '1200px',
    'tr th, tr td': {
      borderBottom: '1px solid #D8D8D8',
    },

    'tr td:last-child, tr th:last-child': {
      borderRight: '1px solid #D8D8D8',
    },

    'tr th': {
      textAlign: 'left',
      whiteSpace: 'nowrap',
      backgroundColor: '#6F8AFE',
      color: 'white',
      fontWeight: 700,
    },

    tr: {
      backgroundColor: 'white !important',
      transition: 'all 0.3s ease-out',
      '&:hover': {
        backgroundColor: '#F6F6F6 !important',
      },
    },
    'tr td': {
      padding: '16px 24px',
      whiteSpace: 'nowrap',
    },

    'tr th:first-child, tr td:first-child': {
      borderLeft: '1px solid #D8D8D8',
    },
    'tr:first-child th': {
      background: '#eee',
      borderTop: '1px solid #D8D8D8',
    },

    'tr:first-child th:first-child': {
      borderTopLeftRadius: '12px',
    },

    'tr:first-child th:last-child': {
      borderTopRightRadius: '12px',
    },
    'tr:last-child td:first-child': {
      borderBottomLeftRadius: '12px',
    },
    'tr:last-child td:last-child ': {
      borderBottomRightRadius: '12px',
    },
  },
  tableTitle: {
    padding: '12px 16px !important',
    textAlign: 'left',
    backgroundColor: 'white !important',
  },
  tableMainText: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
  },
  tableHeader: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '18px',
    padding: '12px 24px',
  },
}))
