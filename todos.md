# Todos Design

## 1차 Design
### 1. 할일 목록을 만든다.
1. 할일
2. 현재 상태
   - todo, doing, done으로 나눈다.
3. id
4. tag값

### 2. 할일 목록을 보여준다.
1. 함수 show를 만든다.
2. all이라는 인자값을 받으면 모든 목록의 현재상태와 갯수를 보여준다.
3. 특정 현재상태를 입력 받으면, 그 상태에 속해있는 할일을 출력한다.

## 2차 Design
### 1. 할일 목록
1. 할일 목록 전체는 배열로 선언하고 각각의 할일 목록은 객체로 구성한다.
2. 할일: string / tags: array / 현재상태: string / id: Number 값으로 받는다.

### 2. 할일 목록 출력 함수
1. 함수의 인자값은 Object와 string 두 가지로 받는다.
    1. Object 인자로는 할일 목록을 받는다.
    2. Sting으로 받는 인자값의 종로는 all, todo, doing, done 4가지를 받는다.

2. 각각의 인자값 종류에 따라서 조건문으로 구분하여 결과값을 출력한다.
   1. string 값 all: 전체 목록의 현재상태와 갯수.
   2. string 값 todo / doing / done: 각 상태의 할일 이름과 총 갯수


## Pseudo Code
```js
const show = (array, status) => {
    switch (status) {

// 모든 status를 보여줄때
        case "all":
        todoCount = 0
        doingCount = 0
        doneCount = 0
        array.forEach(obj => {
            if(obj.status === "todo") {
                todoCount++;
            } 
            if (obj.status === "doing") {
                doingCount++;
            } 
            if (obj.status === "done") {
                doneCount++;
            }
        })

        return `todo: ${todoCount}개, doing: ${doingCount}개, done: ${doneCount}개`
        break;

// status가 todo/doing/done 일때
        case "todo" / "doing" / "done":
        totalCount = 0;
// status에 해당하는 할일 이름 배열로 result 변수에 저장
        const result = array.filter(obj => obj.status === status;)
        .map((obj) => {
            totalCount++;
            return obj.name
        })
        
        return `총 ${totalCount}개: ${result.join(', ')}`
        break;
    }
}
```

