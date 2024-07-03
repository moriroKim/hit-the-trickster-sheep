
//몹 hp 설정
let hp = 500000000000;

// HP게이지에 %로 줄어드는 값 연동
let hpClac = hp;

// 랜덤 데미지 입히기 값 초기화
let dmg = 0;

document.addEventListener('DOMContentLoaded', () => {
    const mob = document.querySelector(".mob-sprite");
    const mobDie = document.querySelector(".mob-die");
    const dmgCounter = document.getElementById("monster");
    const hpGage = document.getElementById("hp-value");
    const hitSFX = document.getElementById("hitSFX");

    // 공격
    function handleAttack() {

        // // 캐릭터 공격받을때 나는 효과음... 을 입히고싶었으나 시끄러워서 안함
        // hitSFX.currentTime = 0;
        // hitSFX.play();

        // 랜덤 데미지 입히기 (데미지 범위 : 1~10000000)
        dmg = Math.floor(Math.random() * (10000000000 - 1 + 1)) + 1;
        hp -= dmg; 
        if (hp < 0) { hp = 0; } // hp가 0이하가 되면 음수가 되지않게 계속 hp에 0을 할당하며 초기화시킴.
        console.log(`남은 체력의 양 : ${hp}`);
        const hpPercent = (hp / hpClac) * 100; // 변수 hp가 줄어드는 값에 따라 HP 게이지의 width 값을 %단위로 계산
        hpGage.style.width = `${hpPercent}%`;

        // 데미지 표시 애니메이션 조건문
        if (hp > 0) {
            const newDmg = document.createElement('div');
            newDmg.classList.add('damage-count');
            newDmg.textContent = `${dmg}`;
            dmgCounter.appendChild(newDmg);
            setTimeout(function() {
                // 2초가 지나고 추가된 데미지 표시 div를 지움
                newDmg.remove();
            }, 2000);
        } else {
            const newDmg = document.createElement('div'); //캐릭터의 hp가 0이되면 데미지 카운터의 텍스트가 '쥬금 ㅠㅠ'로 바뀜.
            newDmg.classList.add('damage-count');
            newDmg.textContent = `쥬금 ㅠㅠ`;
            dmgCounter.appendChild(newDmg);

            mob.style.display = 'none';
            mobDie.style.display = 'block';
        }

        // 캐릭터 공격받을때 흔들리는 애니메이션
        mob.classList.add("vibration");
        setTimeout(function() {
            mob.classList.remove("vibration");
        }, 400);
    }

    // 이벤트리스너
    mob.addEventListener('click', handleAttack);
});