import { MissionUtils } from '@woowacourse/mission-utils';

class App {
    async run() {
        // async는 비동기 처리 => await을 사용하여 문자열 입력까지 대기
        const STR = await MissionUtils.Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');
        MissionUtils.Console.print(`결과 : ${STR}`);
    }
}

export default App;
