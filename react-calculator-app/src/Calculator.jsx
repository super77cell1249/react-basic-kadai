import { useState } from 'react';

export function Calculator() {
  // 表示欄の状態管理
  const [display, setDisplay] = useState('');

  function handleClick(btn) {
    if (btn === 'C') {
      // 表示欄をクリアする
      setDisplay('');
    } else if (btn === '=') {
      // 表示欄に計算結果を表示する
      try {
        const result = calculate(display);
        setDisplay(result);
      } catch (error) {
        setDisplay('エラー');
      }
    } else {
      // 表示欄に数字や演算子を追加する
      setDisplay((display) => display + btn);
    }
  }

  function calculate(expression) {
    // 「整数 演算子 整数」の形式のみ許可
    const validExpression = /^(\d+)([+\-*/])(\d+)$/;

    // 有効な式であるかチェック
    const match = expression.match(validExpression);
    if (!match) {
      throw new Error('エラー');
    }

    //各データ（1つ目の整数・演算子・2つ目の整数）を取得
    const num1 = Number(match[1]); // 1つ目の整数
    const operator = match[2]; // 演算子
    const num2 = Number(match[3]); // 2つ目の整数

    // 演算子に応じた計算処理
    if (operator === '+') return num1 + num2;
    if (operator === '-') return num1 - num2;
    if (operator === '*') return num1 * num2;
    if (operator === '/') {
      if (num2 === 0) throw new Error('エラー'); //0で割るケース
      return num1 / num2;
    }
  }
  // ボタンの配置を表す配列（記述順に表示）
  const buttons = [
    '7',
    '8',
    '9',
    '/',
    '4',
    '5',
    '6',
    '*',
    '1',
    '2',
    '3',
    '-',
    '0',
    'C',
    '=',
    '+',
  ];
  return (
    <div className="calculator-container">
      <h2>電卓アプリ</h2>
      <div className="calculator-display">{display == '' ? 0 : display}</div>
      <div className="button-grid">
        {buttons.map((btn) => (
          <button className="button" key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
