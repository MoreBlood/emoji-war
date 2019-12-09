export const emoticons = [
  '😀',
  '😁',
  '😂',
  '😃',
  '😄',
  '😅',
  '😆',
  '😇',
  '😈',
  '😉',
  '😊',
  '😋',
  '😌',
  '😍',
  '😎',
  '😏',
  '😐',
  '😑',
  '😒',
  '😓',
  '😔',
  '😕',
  '😖',
  '😗',
  '😘',
  '😙',
  '😚',
  '😛',
  '😜',
  '😝',
  '😞',
  '😟',
  '😠',
  '😡',
  '😢',
  '😣',
  '😤',
  '😥',
  '😦',
  '😧',
  '😨',
  '😩',
  '😪',
  '😫',
  '😬',
  '😭',
  '😮',
  '😯',
  '😰',
  '😱',
  '😲',
  '😳',
  '😴',
  '😵',
  '😶',
  '😷',
  '😸',
  '😹',
  '😺',
  '😻',
  '😼',
  '😽',
  '😾',
  '😿',
  '🙀',
  '🙁',
  '🙂',
  '🙃',
  '🙄',
];

export const skin = ['🏻', '🏼', '🏽', '🏾', '🏿'];

export const colorable = [
  '👋',
  '🤚',
  '🖐',
  '✋',
  '🖖',
  '👌',
  '🤏',
  '✌',
  '🤞',
  '🤟',
  '🤘',
  '🤙',
  '👈',
  '👉',
  '👆',
  '🖕',
  '👇',
  '👍',
  '👎',
  '✊',
  '👊',
  '🤛',
  '🤜',
  '👏',
  '🙌',
  '👐',
  '🤲',
  '🙏',
  '✍',
  '💅',
  '🤝',
  '🤳',
  '💪',
  '🦵',
  '🦶',
  '👂',
  '🦻',
  '👃',
  '👶',
  '🧒',
  '👦',
  '👧',
  '🧑',
  '👱',
  '👨',
  '🧔',
  '👩',
  '🧓',
  '👴',
  '👵',
  '🙍',
  '🙎',
  '🙅',
  '🙆',
  '💁',
  '🙋',
  '🧏',
  '🙇',
  '🤦',
  '🤷',
  '👮',
  '🕵',
  '💂',
  '👷',
  '🤴',
  '👸',
  '👳',
  '👲',
  '🧕',
  '🤵',
  '👰',
  '🤰',
  '🤱',
  '👼',
  '🎅',
  '🤶',
  '🦸',
  '🦹',
  '🧙',
  '🧚',
  '🧛',
  '🧜',
  '🧝',
  '💆',
  '💇',
  '🚶',
  '🧍',
  '🧎',
  '🏃',
  '💃',
  '🕺',
  '🕴',
  '👯',
  '🧖',
  '🧗',
  '🏇',
  '🏂',
  '🏌',
  '🏄',
  '🚣',
  '🏊',
  '⛹',
  '🏋',
  '🚴',
  '🚵',
  '🤸',
  '🤽',
  '🤾',
  '🤹',
  '🧘',
  '👭',
  '👫',
  '👬',
  '💏',
  '💑',
  '👪',
  '🤼',
];

function getNumberEmoji(num: number): string {
  switch (num) {
    case 1:
      return '1️⃣';
      break;
    case 2:
      return '2️⃣';
      break;
    case 3:
      return '3️⃣';
      break;
    case 4:
      return '4️⃣';
      break;
    case 5:
      return '5️⃣';
      break;
    case 6:
      return '6️⃣';
      break;
    case 7:
      return '7️⃣';
      break;
    case 8:
      return '8️⃣';
      break;
    case 9:
      return '9️⃣';
      break;
    case 0:
      return '0️⃣';
      break;
    default:
      return '';
  }
}

export function numberToEmojiString(num: number): string[] {
  const array = num.toString().split('');
  const res: string[] = [];

  array.forEach(el => {
    res.push(getNumberEmoji(+el));
  });

  return res;
}
