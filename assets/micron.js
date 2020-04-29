const watchEvents = function () {
    window.addEventListener("click", function (ev) {
        const micronTrigger = ev.target;
        const micronPrefix = "mjs-";
        const micronData = micronTrigger.dataset.micron;
        const micronDataDuration = micronTrigger.dataset.micronDuration;
        const micronDataTiming = micronTrigger.dataset.micronTiming;
        const micronBind = micronTrigger.dataset.micronBind;
        const micronPuppet = micronTrigger.dataset.micronId;
        //Global Trigger
        if (micronData !== undefined) {
            if (micronBind === "true") {
                if (micronPuppet !== undefined) {
                    var node = document.getElementById(micronPuppet);
                    if (node !== undefined && node !== null) {
                        var twinNode = node;
                        node.parentNode.replaceChild(twinNode, node);
                        twinNode.classList.add(micronPrefix + micronData);
                    } else {
                        console.log("%c Micron Error : None of the DOM element reference to the declared ID", "color:red");
                        return false;
                    }
                } else {
                    console.log("%c Micron Error : add data-micron-id to bind an interaction", "color:red");
                    return false;
                }
            } else {
                var node = micronTrigger;
                var twinNode = node;
                node.parentNode.replaceChild(twinNode, node);
                twinNode.classList.add(micronPrefix + micronData);
            }
        } else {
            return false;
        }

        //Duration
        if (micronDataDuration !== undefined) {
            if (isNaN(micronDataDuration)) {
                console.log("%c Micron Error : data-micron-duration can only be number or decimal", "color:red");
                console.log("%c Micron Fallback : data-micron-duration set to default", "color:orange");
                twinNode.style.animationDuration = ".45s";
            } else {
                twinNode.style.animationDuration = micronDataDuration + "s";
            }
        } else {
            twinNode.style.animationDuration = ".45s";
        }

        //Easing Timing Function
        if (micronDataTiming !== undefined) {
            if (micronDataTiming === "linear" || micronDataTiming === "ease-in" || micronDataTiming === "ease-out" || micronDataTiming === "ease-in-out") {
                twinNode.classList.add(micronPrefix + micronDataTiming);
            } else {
                console.log("%c Micron Error : data-micron-timing currently supports linear, ease-in, ease-out and ease-in-out only", "color:red");
                console.log("%c Micron Fallback : data-micron-timing set to default", "color:orange");
                twinNode.classList.add(micronPrefix + "ease-in-out");
            }
        } else {
            twinNode.classList.add(micronPrefix + "ease-in-out");
        }

    });
};

// If micron.js gets fetched asynchronously
// We may or may not catch the DOMContentLoaded event
if (document.readyState !== "loading") {
    watchEvents();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        watchEvents();
    });
}

//Micron Prototype
const Micron = function () {
    let ele;
    let node;

    //Get Element from DOM
    const getEle = function (paramEle) {
        ele = document.querySelector(paramEle);
        if (ele != undefined) {
            node = ele;
            ele.parentNode.replaceChild(node, ele);
            return this;
        } else {
            console.log(
                "%c Micron Error : None of the DOM element reference to the argument which is passed to getEle() method",
                "color:red");
            return this;
        }
    };

    //Animation
    const interaction = function (paramInteraction) {
        if (node !== undefined && node !== null) {
            if (paramInteraction != undefined && paramInteraction.indexOf(" ") ==
                -1) {
                const prefixAnimation = "mjs-" + paramInteraction;
                node.classList.add(prefixAnimation);
                return this;
            } else {
                console.log(
                    "%c Micron Error : either you are missing an argument or trying to pass an argument with spaces to interaction() method",
                    "color:red");
                return this;
            }
        } else {
            return this;
        }
    };

    //Duration
    const duration = function (paramDuration) {
        if (node != undefined) {
            if (isNaN(paramDuration) == false) {
                node.style.animationDuration = paramDuration + "s";
                return this;
            } else {
                console.log("%c Micron Error : you can only pass number or decimal as arguments to duration() method", "color:red");
                return this;
            }
        } else {
            return this;
        }
    };

    const timing = function (paramTiming) {
        if (node != undefined) {
            if (paramTiming == "linear" || paramTiming == "ease-in" || paramTiming == "ease-out" ||
                paramTiming == "ease-in-out") {
                const prefixTiming = "mjs-" + paramTiming;
                node.classList.add(prefixTiming);
                return this;
            } else {
                console.log("%c Micron Error : you can only pass linear, ease-in, ease-out and ease-in-out as arguments to timing() method", "color:red");
                return this;
            }
        } else {
            return this;
        }

    };

    return {
        getEle: getEle,
        interaction: interaction,
        duration: duration,
        timing: timing
    }
};

const micron = Micron();

// Only export the CommonJS module if available
if(typeof module === "object" && module.exports) {
    module.exports = micron;
}

//Usage Sample
//micron.getEle().interaction().duration().timing();