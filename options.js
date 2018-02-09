const DEFAULT_BOLD = false
const DEFAULT_COLOR = "000000"
const DEFAULT_FORMAT = true
const TEMPLATE_FORMAT_PATTERN = "${num}"
const DEFAULT_FORMAT_PATTERN = "#" + TEMPLATE_FORMAT_PATTERN
const DEFAULT_SHOW_COPY = false
const DEFAULT_COPY_PREFIX = ""
const DEFAULT_COPY_SEP = ", "
const DEFAULT_COPY_SUFFIX = ""

function save_options() {
	var format = document.getElementById('format').checked;
    var formatPattern = document.getElementById('format-pattern').value;
    var bold = document.getElementById('bold').checked;
    var color = document.getElementById('id-color').value;
    var copy = document.getElementById('show-copy').checked;
    var pref = document.getElementById('copy-prefix').value;
    var sep = document.getElementById('copy-sep').value;
    var suff = document.getElementById('copy-suffix').value;
    chrome.storage.sync.set({
		format: format,
        formatPattern: formatPattern,
        boldId: bold,
        idColor: color,
        showCopy: copy,
        copyPrefix: pref,
        copySep: sep,
        copySuffix: suff
    }, function() {
        window.close();
    });
}

function reset_defaults() {
	document.getElementById('format').checked = DEFAULT_FORMAT;
    document.getElementById('format-pattern').value = DEFAULT_FORMAT_PATTERN;
    document.getElementById('bold').checked = DEFAULT_BOLD;
    document.getElementById('show-copy').checked = DEFAULT_SHOW_COPY;
    document.getElementById('id-color').color.fromString("#"+DEFAULT_COLOR);
    document.getElementById('copy-prefix').value = DEFAULT_COPY_PREFIX;
    document.getElementById('copy-sep').value = DEFAULT_COPY_SEP;
    document.getElementById('copy-suffix').value = DEFAULT_COPY_SUFFIX;
	format_preview();
}

function restore_options() {
    chrome.storage.sync.get({
		format: DEFAULT_FORMAT,
        formatPattern: DEFAULT_FORMAT_PATTERN,
        boldId: DEFAULT_BOLD,
        idColor: DEFAULT_COLOR,
        showCopy: DEFAULT_SHOW_COPY,
        copyPrefix: DEFAULT_COPY_PREFIX,
        copySep: DEFAULT_COPY_SEP,
        copySuffix: DEFAULT_COPY_SUFFIX
    }, function(items) {
		document.getElementById('format').checked = items.format;
		document.getElementById('format-pattern').value = items.formatPattern;
        document.getElementById('bold').checked = items.boldId;
        document.getElementById('id-color').color.fromString(items.idColor);
        document.getElementById('show-copy').checked = items.showCopy;
	    document.getElementById('copy-prefix').value = items.copyPrefix;
	    document.getElementById('copy-sep').value = items.copySep;
	    document.getElementById('copy-suffix').value = items.copySuffix;
		format_preview();
    });
}

function format_preview() {
	var pattern = document.getElementById('format-pattern').value;
	document.getElementById('format-preview').innerHTML = pattern.replace('${num}', '123');
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('defaults').addEventListener('click', reset_defaults);
document.getElementById('format-pattern').addEventListener('keyup', format_preview);
