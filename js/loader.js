var loader = '<style>#fountainG{ position:relative; width:83px; height:10px}.fountainG{ position:absolute; top:0; background-color:#6BA8A0; width:11px; height:11px; -moz-animation-name:bounce_fountainG; -moz-animation-duration:1.2s; -moz-animation-iteration-count:infinite; -moz-animation-direction:linear; -moz-transform:scale(.3); -moz-border-radius:7px; -webkit-animation-name:bounce_fountainG; -webkit-animation-duration:1.2s; -webkit-animation-iteration-count:infinite; -webkit-animation-direction:linear; -webkit-transform:scale(.3); -webkit-border-radius:7px; -ms-animation-name:bounce_fountainG; -ms-animation-duration:1.2s; -ms-animation-iteration-count:infinite; -ms-animation-direction:linear; -ms-transform:scale(.3); -ms-border-radius:7px; -o-animation-name:bounce_fountainG; -o-animation-duration:1.2s; -o-animation-iteration-count:infinite; -o-animation-direction:linear; -o-transform:scale(.3); -o-border-radius:7px; animation-name:bounce_fountainG; animation-duration:1.2s; animation-iteration-count:infinite; animation-direction:linear; transform:scale(.3); border-radius:7px; }#fountainG_1{ left:0; -moz-animation-delay:0.48s; -webkit-animation-delay:0.48s; -ms-animation-delay:0.48s; -o-animation-delay:0.48s; animation-delay:0.48s; }#fountainG_2{ left:10px; -moz-animation-delay:0.6s; -webkit-animation-delay:0.6s; -ms-animation-delay:0.6s; -o-animation-delay:0.6s; animation-delay:0.6s; }#fountainG_3{ left:21px; -moz-animation-delay:0.72s; -webkit-animation-delay:0.72s; -ms-animation-delay:0.72s; -o-animation-delay:0.72s; animation-delay:0.72s; }#fountainG_4{ left:31px; -moz-animation-delay:0.84s; -webkit-animation-delay:0.84s; -ms-animation-delay:0.84s; -o-animation-delay:0.84s; animation-delay:0.84s; }#fountainG_5{ left:42px; -moz-animation-delay:0.96s; -webkit-animation-delay:0.96s; -ms-animation-delay:0.96s; -o-animation-delay:0.96s; animation-delay:0.96s; }#fountainG_6{ left:52px; -moz-animation-delay:1.08s; -webkit-animation-delay:1.08s; -ms-animation-delay:1.08s; -o-animation-delay:1.08s; animation-delay:1.08s; }#fountainG_7{ left:62px; -moz-animation-delay:1.2s; -webkit-animation-delay:1.2s; -ms-animation-delay:1.2s; -o-animation-delay:1.2s; animation-delay:1.2s; }#fountainG_8{ left:73px; -moz-animation-delay:1.32s; -webkit-animation-delay:1.32s; -ms-animation-delay:1.32s; -o-animation-delay:1.32s; animation-delay:1.32s; }@-moz-keyframes bounce_fountainG{0%{ -moz-transform:scale(1); background-color:#6BA8A0; }100%{ -moz-transform:scale(.3); background-color:#C2D8D8; }}@-webkit-keyframes bounce_fountainG{0%{ -webkit-transform:scale(1); background-color:#6BA8A0; }100%{ -webkit-transform:scale(.3); background-color:#C2D8D8; }}@-ms-keyframes bounce_fountainG{0%{ -ms-transform:scale(1); background-color:#6BA8A0; }100%{ -ms-transform:scale(.3); background-color:#C2D8D8; }}@-o-keyframes bounce_fountainG{0%{ -o-transform:scale(1); background-color:#6BA8A0; }100%{ -o-transform:scale(.3); background-color:#C2D8D8; }}@keyframes bounce_fountainG{0%{ transform:scale(1); background-color:#6BA8A0; }100%{ transform:scale(.3); background-color:#C2D8D8; }}</style><div id="fountainG"><div id="fountainG_1" class="fountainG"></div><div id="fountainG_2" class="fountainG"></div><div id="fountainG_3" class="fountainG"></div><div id="fountainG_4" class="fountainG"></div><div id="fountainG_5" class="fountainG"></div><div id="fountainG_6" class="fountainG"></div><div id="fountainG_7" class="fountainG"></div><div id="fountainG_8" class="fountainG"></div></div>';

function startLoader(e) {
    $(e).append(loader);
}

function stopLoader() {
    $('#fountainG').remove();
}