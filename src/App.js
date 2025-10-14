import { MissionUtils } from '@woowacourse/mission-utils';

class App {
    async run() {
        // async는 비동기 처리 => await을 사용하여 문자열 입력까지 대기
        const STR = await MissionUtils.Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

        // 쉼표와 콜론 두 가지 기본 구분자 사용
        let NUM = STR.split(/,|:/);

        // 커스텀 구분자 시작(S), 종료(E) 인덱스 찾기
        // / 또는 \n이 문자열에 포함되지 않으면 -1 반환
        const S = STR.lastIndexOf('/') + 1;
        const E = STR.indexOf('\\n'); // 문자 \를 나타내기 위해 \를 한번 더 작성하여 escape

        // 커스텀 구분자 사용시
        if (S !== -1 && E !== -1) {
            const DIV = STR.substring(S, E); // 커스텀 구분자 추출
            const NEW_STR = STR.substring(E + 2); // 숫자와 구분자만 있는 문자열 생성
            NUM = NEW_STR.split(DIV);
        }

        // 배열을 돌면서 각 요소를 숫자로 결과에 덧셈
        let RES = 0;
        NUM.forEach((el) => {
            RES += Number(el);
        });

        // 결과 출력
        MissionUtils.Console.print(`결과 : ${RES}`);
    }
}

export default App;
