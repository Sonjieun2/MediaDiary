export const Field = {
  runningTime: {
    label: '러닝타임',
    placeholder: '0분',
  },
  platform: {
    label: '시청처',
    placeholder: 'CGV',
  },
  seat: {
    label: '좌석번호',
    placeholder: 'A열 10',
  },
  format: {
    label: '관람형식',
    placeholder: '2D',
  },
  
  episode: {
    label: '총 회차',
    placeholder: '16화',
  },
  company: {
    label: '제작사',
    placeholder: 'tvN',
  },
}

export const FieldConfig = {
  movie: ['runningTime', 'platform', 'seat', 'format'],
  animation: ['episode', 'platform', 'company'],
  drama: ['episode', 'platform', 'company'],
}