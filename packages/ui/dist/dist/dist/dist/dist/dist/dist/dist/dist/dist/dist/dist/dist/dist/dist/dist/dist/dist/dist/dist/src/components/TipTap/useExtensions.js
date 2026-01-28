"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useExtensions;
var _extensionBlockquote = require("@tiptap/extension-blockquote");
var _extensionBold = require("@tiptap/extension-bold");
var _extensionBulletList = require("@tiptap/extension-bullet-list");
var _extensionCode = require("@tiptap/extension-code");
var _extensionCodeBlock = require("@tiptap/extension-code-block");
var _extensionColor = require("@tiptap/extension-color");
var _extensionDocument = require("@tiptap/extension-document");
var _extensionDropcursor = require("@tiptap/extension-dropcursor");
var _extensionFontFamily = require("@tiptap/extension-font-family");
var _extensionGapcursor = require("@tiptap/extension-gapcursor");
var _extensionHardBreak = require("@tiptap/extension-hard-break");
var _extensionHighlight = require("@tiptap/extension-highlight");
var _extensionHistory = require("@tiptap/extension-history");
var _extensionHorizontalRule = require("@tiptap/extension-horizontal-rule");
var _extensionItalic = require("@tiptap/extension-italic");
var _extensionLink = require("@tiptap/extension-link");
var _extensionListItem = require("@tiptap/extension-list-item");
var _extensionMention = require("@tiptap/extension-mention");
var _extensionOrderedList = require("@tiptap/extension-ordered-list");
var _extensionParagraph = require("@tiptap/extension-paragraph");
var _extensionPlaceholder = require("@tiptap/extension-placeholder");
var _extensionStrike = require("@tiptap/extension-strike");
var _extensionSubscript = require("@tiptap/extension-subscript");
var _extensionSuperscript = require("@tiptap/extension-superscript");
var _extensionTableCell = require("@tiptap/extension-table-cell");
var _extensionTableHeader = require("@tiptap/extension-table-header");
var _extensionTableRow = require("@tiptap/extension-table-row");
var _extensionTaskItem = require("@tiptap/extension-task-item");
var _extensionTaskList = require("@tiptap/extension-task-list");
var _extensionText = require("@tiptap/extension-text");
var _extensionTextAlign = require("@tiptap/extension-text-align");
var _extensionTextStyle = require("@tiptap/extension-text-style");
var _extensionUnderline = require("@tiptap/extension-underline");
var _react = require("react");
var _muiTiptap = require("mui-tiptap");
var _MentionSuggestionOptions = require("./MentionSuggestionOptions");
// A hook for providing a default set of useful extensions for the MUI-Tiptap editor
function useExtensions() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    placeholder = _ref.placeholder;
  return (0, _react.useMemo)(function () {
    // Custom Link with inclusive: false
    var CustomLinkExtension = _extensionLink.Link.extend({
      inclusive: false
    });

    // Make subscript and superscript mutually exclusive
    var CustomSubscript = _extensionSubscript.Subscript.extend({
      excludes: "superscript"
    });
    var CustomSuperscript = _extensionSuperscript.Superscript.extend({
      excludes: "subscript"
    });
    return [_muiTiptap.TableImproved.configure({
      resizable: true
    }), _extensionTableRow.TableRow, _extensionTableHeader.TableHeader, _extensionTableCell.TableCell, _extensionBulletList.BulletList, _extensionCodeBlock.CodeBlock, _extensionDocument.Document, _extensionHardBreak.HardBreak, _extensionListItem.ListItem, _extensionOrderedList.OrderedList, _extensionParagraph.Paragraph, CustomSubscript, CustomSuperscript, _extensionText.Text, _extensionBold.Bold, _extensionBlockquote.Blockquote, _extensionCode.Code, _extensionItalic.Italic, _extensionUnderline.Underline, _extensionStrike.Strike, CustomLinkExtension.configure({
      autolink: true,
      linkOnPaste: true,
      openOnClick: false
    }), _muiTiptap.LinkBubbleMenuHandler, _extensionGapcursor.Gapcursor, _muiTiptap.HeadingWithAnchor, _extensionTextAlign.TextAlign.configure({
      types: ["heading", "paragraph", "image"]
    }), _extensionTextStyle.TextStyle, _extensionColor.Color, _extensionFontFamily.FontFamily, _muiTiptap.FontSize, _extensionHighlight.Highlight.configure({
      multicolor: true
    }), _extensionHorizontalRule.HorizontalRule, _muiTiptap.ResizableImage, _extensionDropcursor.Dropcursor, _extensionTaskList.TaskList, _extensionTaskItem.TaskItem.configure({
      nested: true
    }), _extensionMention.Mention.configure({
      suggestion: _MentionSuggestionOptions.MentionSuggestionOptions
    }), _extensionPlaceholder.Placeholder.configure({
      placeholder: placeholder
    }), _extensionHistory.History];
  }, [placeholder]);
}