document.addEventListener('DOMContentLoaded', function (event) {

    document.querySelector('input[type="number"]').addEventListener("change", function () {
        if (document.getElementById("inputMilliseconds").checked) {
            this.value = parseFloat(this.value).toFixed(3);
        }
    });

    document.querySelectorAll("input, select").forEach(elm => elm.addEventListener("input", updateDuration));

    function updateDuration() {
        document.getElementById("elapsedTime").innerText =
            Number(document.getElementById("inputNum").value)
                .toDurationString(document.getElementById("inputUnit").value,
                    {
                        maxOutputLevel: document.getElementById("inputMax").value,
                        includeMilliseconds: document.getElementById("inputMilliseconds").checked,
                        padZeros: document.getElementById("inputPad").checked,
                        addLabels: document.getElementById("inputLabels").checked,
                        delimiter: document.getElementById("inputDelimiter").value
                    });
    }
})
;