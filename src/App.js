import { MissionUtils } from '@woowacourse/mission-utils';

class App {
    async run() {
        try {
            // async는 비동기 처리 => await을 사용하여 문자열 입력까지 대기
            const input_str = await MissionUtils.Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

            // 쉼표와 콜론 두 가지 기본 구분자 사용
            let num_array = input_str.split(/,|:/);

            // 커스텀 구분자 시작(start_idx), 종료(end_idx) 인덱스 찾기
            // / 또는 \n이 문자열에 포함되지 않으면 -1 반환
            const start_idx = input_str.lastIndexOf('/') + 1;
            const end_idx = input_str.indexOf('\\n'); // 문자 \를 나타내기 위해 \를 한번 더 작성하여 escape

            // 커스텀 구분자 사용시
            const ERROR_NUM = -1;
            if (start_idx !== ERROR_NUM && end_idx !== ERROR_NUM) {
                const custom_delimiter = input_str.substring(start_idx, end_idx); // 커스텀 구분자 추출
                const num_part = input_str.substring(end_idx + 2); // 숫자와 구분자만 있는 문자열 생성

                // 변수와 함께 정규 표현식을 만들기 위해 RegExp() 객체 생성
                num_array = num_part.split(new RegExp(`,|:|${custom_delimiter}`));
            }

            // 배열을 돌면서 각 요소를 숫자로 결과에 덧셈
            let result = 0;
            num_array.forEach((element) => {
                result += Number(element);
            });

            if (isNaN(result)) {
                // Error1: 결과가 NaN인 경우
                throw new Error('결과 값이 NaN입니다.');
            } else if (result < 0) {
                // Error2: 결과가 음수인 경우
                throw new Error('결과 값이 음수입니다.');
            } else {
                // 결과 출력
                MissionUtils.Console.print(`결과 : ${result}`);
            }
        } catch (error) {
            // Error 메시지 출력
            MissionUtils.Console.print(`[ERROR] : ${error.message}`);
        }
    }
}

export default App;
