(function() {
    var amountEl = document.getElementById('loanAmount');
    var rateEl = document.getElementById('loanRate');
    var termEl = document.getElementById('loanTermValue');
    var monthlyEl = document.getElementById('loanMonthly');
    var totalEl = document.getElementById('loanTotal');
    var interestEl = document.getElementById('loanInterest');
    var tableBody = document.getElementById('loanTableBody');
    var scheduleEl = document.getElementById('loanSchedule');
    var arrowEl = document.getElementById('loanScheduleArrow');
    var termUnit = 'years';

    function fmt(n) {
        return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calculate() {
        var P = parseFloat(amountEl.value);
        var annualRate = parseFloat(rateEl.value);
        var termVal = parseFloat(termEl.value);
        if (isNaN(P) || isNaN(annualRate) || isNaN(termVal) || P <= 0 || termVal <= 0) {
            monthlyEl.textContent = '--';
            totalEl.textContent = '--';
            interestEl.textContent = '--';
            tableBody.innerHTML = '';
            return;
        }
        var n = termUnit === 'years' ? termVal * 12 : termVal;
        var r = annualRate / 100 / 12;
        var M;
        if (r === 0) {
            M = P / n;
        } else {
            M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }
        var totalPay = M * n;
        var totalInt = totalPay - P;
        monthlyEl.textContent = fmt(M);
        totalEl.textContent = fmt(totalPay);
        interestEl.textContent = fmt(totalInt);
        // Amortization schedule
        var rows = '';
        var balance = P;
        for (var i = 1; i <= n; i++) {
            var intPay = balance * r;
            var prinPay = M - intPay;
            balance -= prinPay;
            if (balance < 0) balance = 0;
            rows += '<tr><td>' + i + '</td><td>' + fmt(M) + '</td><td>' + fmt(prinPay) + '</td><td>' + fmt(intPay) + '</td><td>' + fmt(balance) + '</td></tr>';
        }
        tableBody.innerHTML = rows;
    }

    document.getElementById('loanCalculate').addEventListener('click', calculate);
    [amountEl, rateEl, termEl].forEach(function(el) {
        el.addEventListener('input', calculate);
    });

    document.getElementById('loanTermYears').addEventListener('click', function() {
        termUnit = 'years';
        this.classList.add('loan-toggle-active');
        document.getElementById('loanTermMonths').classList.remove('loan-toggle-active');
        calculate();
    });
    document.getElementById('loanTermMonths').addEventListener('click', function() {
        termUnit = 'months';
        this.classList.add('loan-toggle-active');
        document.getElementById('loanTermYears').classList.remove('loan-toggle-active');
        calculate();
    });

    document.getElementById('loanScheduleToggle').addEventListener('click', function() {
        scheduleEl.classList.toggle('open');
        arrowEl.classList.toggle('open');
    });
})();
