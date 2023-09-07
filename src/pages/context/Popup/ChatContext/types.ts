export enum CHART_TYPE {
  TABLE = 'table',
  PIE = 'pie',
  BAR = 'bar',
  LIST = 'list',
  TEXT = 'text',
  SOURCE_CODE = 'source_code'
}

export interface ChartMessage {
  chart_type: `${CHART_TYPE}`
  data: {
    row_data: string[][]
    table_header: string[]
  }
  description: string
  is_raw: boolean
  method: string
  model_type: string
  referencer: string
  title: string
  tool: string
}

export interface ISourceCodeMessage {
  chart_type: CHART_TYPE.SOURCE_CODE
  data: {
    code: string
    language: string
  }
  description: string
  is_raw: boolean
  method: string
  model_type: string
  referencer: string
  title: string
  tool: string
}

export interface IMessageDetail {
  type: 'user' | 'bot' | 'loading' | 'error'
  message: string | ChartMessage | ChartMessage[]
  done: boolean
  id: string
}

export interface IChatState {
  chatMode: boolean
  botChatting: boolean
  allowTypeWritterEffect: boolean
  messageList: IMessageDetail[]
}

export enum BOT_MESSAGE_TYPE {
  RECEIVE = 'receive',
  BUSY = 'busy',
  THINKING = 'thinking',
  ERROR = 'error',
  END = 'end',
}

export interface IBotMessage {
  wallet: string
  message: string | ChartMessage | ChartMessage[]
  type: `${BOT_MESSAGE_TYPE}`
  sender: string
}
