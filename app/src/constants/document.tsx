import { ProjectTypes } from '@/types'
// @ts-ignore
import json2csv from 'csvjson-json2csv'

interface Sample {
  text: string
}

export const FORMAT_LABELS = {
  json: 'JSON',
  csv: 'CSV',
  plain: 'Plain',
  // conll: 'Conll',
  pdf: 'PDF',
}

export type FormatTypes = keyof typeof FORMAT_LABELS

export const EXPORTED_FORMAT_TYPE: Record<'json' | 'csv' | 'txt', string> = {
  json: 'application/json;charset=utf-8',
  csv: 'text/csv;charset=utf-8',
  txt: 'text/plain;charset=utf-8"',
}

export const FORMAT_ACCEPTS: Record<FormatTypes, string> = {
  json: '.json,.jsonl',
  csv: '.csv',
  plain: '.txt',
  // conll: '.conll',
  pdf: '.pdf',
}

export const PROJECT_FILE_FORMAT: Record<ProjectTypes, FormatTypes[]> = {
  TextClassificationProject: ['json', 'csv', 'plain'],
  SequenceLabelingProject: [
    'json',
    'csv',
    'plain',
    // conll: `EU	B-ORG
    // rejects	O
    // German	B-MISC
    // call	O
    // to	O
    // boycott	O
    // British	B-MISC
    // lamb	O
    // .	O
    // Peter	B-PER
    // Blackburn	I-PER`,
  ],
  Seq2seqProject: ['json', 'csv', 'plain'],
  PdfLabelingProject: ['json', 'pdf'],
}

export const PROJECT_SAMPLE: Record<ProjectTypes, Sample[]> = {
  TextClassificationProject: [
    { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { text: 'Mauris eget efficitur lorem.' },
    { text: 'Interdum et malesuada fames ac ante ipsum primis in faucibus' },
  ],
  SequenceLabelingProject: [
    { text: 'Eu facilisis sed odio morbi quis commodo' },
    {
      text: 'Egestas egestas fringilla phasellus faucibus scelerisque eleifend',
    },
    { text: 'Magna sit amet purus gravida quis blandit turpis cursus' },
  ],
  Seq2seqProject: [
    { text: 'Eu facilisis sed odio morbi quis commodo' },
    {
      text: 'Egestas egestas fringilla phasellus faucibus scelerisque eleifend',
    },
    { text: 'Magna sit amet purus gravida quis blandit turpis cursus' },
  ],
  PdfLabelingProject: [
    { text: 'https://arxiv.org/pdf/1912.08255.pdf' },
    {
      text: 'https://arxiv.org/pdf/1912.06791.pdf',
    },
  ],
}

export const GET_SAMPLE_TEXT: Record<FormatTypes, (sample: Sample[]) => string | null> = {
  json: (sample: Sample[]) => JSON.stringify(sample, null, 2),
  plain: (sample: Sample[]) => {
    return json2csv(sample).split('\n').splice(1).join('\n')
  },
  csv: (sample: Sample[]) => {
    return json2csv(sample) as string
  },
  pdf: () => null,
}
