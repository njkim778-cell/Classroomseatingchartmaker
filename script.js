script.js (기능 담당)
JavaScript
document.getElementById('start-btn').addEventListener('click', function() {
    // 1. 입력값 가져오기 및 파싱
    const maleRaw = document.getElementById('male-input').value;
    const femaleRaw = document.getElementById('female-input').value;
    const numCols = parseInt(document.getElementById('cols-input').value) || 6;

    // 쉼표(,)나 줄바꿈(\n)으로 분리하고 양끝 공백 제거, 빈 문자열 필터링
    const males = maleRaw.split(/[\n,]+/).map(name => name.trim()).filter(name => name !== "");
    const females = femaleRaw.split(/[\n,]+/).map(name => name.trim()).filter(name => name !== "");

    // 학생 객체 배열 생성 (성별 태그 포함)
    let students = [
        ...males.map(name => ({ name, gender: 'male' })),
        ...females.map(name => ({ name, gender: 'female' }))
    ];

    if (students.length === 0) {
        alert("학생 이름을 입력해 주세요!");
        return;
    }

    // 2. 무작위 셔플 알고리즘 (Fisher-Yates Shuffle)
    for (let i = students.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [students[i], students[j]] = [students[j], students[i]];
    }

    // 3. Grid 화면 배치 구현
    const gridContainer = document.getElementById('classroom-grid');
    gridContainer.innerHTML = ''; // 기존 자리 초기화
    
    // CSS Grid 열(Column) 개수 동적 조절
    gridContainer.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;

    // 자리 배치 시작 (앞자리부터 순서대로 채움)
    students.forEach(student => {
        const desk = document.createElement('div');
        desk.classList.add('desk', student.gender);
        desk.innerText = student.name;
        gridContainer.appendChild(desk);
    });

    // 남는 빈자리가 있을 경우 빈 책상으로 채우기 (Grid 정렬 깨짐 방지)
    const remainder = students.length % numCols;
    if (remainder !== 0) {
        const emptySeatsNeeded = numCols - remainder;
        for (let i = 0; i < emptySeatsNeeded; i++) {
            const emptyDesk = document.createElement('div');
            emptyDesk.classList.add('desk', 'empty');
            emptyDesk.innerText = "빈자리";
            gridContainer.appendChild(emptyDesk);
        }
