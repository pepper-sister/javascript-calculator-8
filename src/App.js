import { MissionUtils } from '@woowacourse/mission-utils';

class App {
    async run() {
        try {
            // async는 비동기 처리 => await을 사용하여 문자열 입력까지 대기
            const input_str = await MissionUtils.Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

            // 쉼표와 콜론 두 가지 기본 구분자 사용
            let num_array;

            // 커스텀 구분자 사용시
            const ERROR_NUM = -1;
            const START_IDX = 2;
            // //로 시작할 때 (커스텀 구분자 형식)
            if (input_str.startsWith('//')) {
                // 커스텀 구분자 종료 인덱스(end_idx) 찾기
                const end_idx = input_str.indexOf('\\n'); // 문자 \를 나타내기 위해 \를 한번 더 작성하여 escape
                if (end_idx === ERROR_NUM) throw new Error('커스텀 구분자 형식이 잘못되었습니다.');

                let custom_delimiter = input_str.substring(START_IDX, end_idx); // 커스텀 구분자 추출
                if (custom_delimiter === '') throw new Error('커스텀 구분자를 입력하지 않았습니다.'); // 커스텀 구분자를 입력하지 않은 경우
                if (custom_delimiter.length >= 2) throw new Error('커스텀 구분자는 하나의 문자만 입력할 수 있습니다.'); // 커스텀 구분자의 길이가 2이상인 경우
                if (/^\d$/.test(custom_delimiter)) throw new Error('커스텀 구분자에 숫자는 사용할 수 없습니다.');

                const num_part = input_str.substring(end_idx + START_IDX); // 숫자와 구분자만 있는 문자열 생성

                // 커스텀 구분자가 메타문자인 경우, \를 한번 더 작성하여 escape
                custom_delimiter = custom_delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                // 변수와 함께 정규 표현식을 만들기 위해 RegExp() 객체 생성
                num_array = num_part.split(new RegExp(`,|:|${custom_delimiter}`));
            } else {
                num_array = input_str.split(/,|:/);
            }

            // 배열을 돌면서 각 요소를 숫자로 결과에 덧셈
            let result = 0;
            num_array.forEach((element) => {
                // if (element === '') element = 0; // 숫자가 공백인 경우 0으로 처리
                const num = Number(element);
                if (isNaN(num)) throw new Error('숫자가 아닌 값이 포함되었습니다.');
                if (num < 0) throw new Error('음수는 입력할 수 없습니다.');
                result += num;
            });

            MissionUtils.Console.print(`결과 : ${result}`);
        } catch (error) {
            // Error 메시지 출력
            MissionUtils.Console.print(`[ERROR] : ${error.message}`);
        }
    }
}

export default App;
