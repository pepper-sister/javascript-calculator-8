import { MissionUtils } from '@woowacourse/mission-utils';

class App {
    async run() {
        // async는 비동기 처리 => await을 사용하여 문자열 입력까지 대기
        const STR = await MissionUtils.Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

        // 쉼표와 콜론 두 가지 기본 구분자 사용
        let NUM = STR.split(/,|:/);

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
