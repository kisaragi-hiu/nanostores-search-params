;;; cmds.el --- Emacs commands for this project -*- lexical-binding: t; -*-
;;
;;; Code:

(require 'magit)

(defun my/first-field (s)
  "Return the first space-separated field of S."
  (let ((space-pos (cl-position ?\s s)))
    (if space-pos
        (substring s 0 space-pos)
      s)))

(defun my/read-commit (prompt &optional initial-input history)
  "Prompt for a commit."
  (my/first-field
   (or (magit-completing-read
        prompt (append
                '("HEAD")
                (magit-git-lines
                 "log"
                 "--pretty=format:%h %aI %s")
                (magit-list-refnames))
        nil nil initial-input history
        (or (magit-branch-or-commit-at-point)
            (magit-get-current-branch)))
       (error "No selection"))))

(defun my/insert-github-commit-link (rev)
  "Insert a link to the github page for REV."
  (interactive
   (list (my/read-commit "Revision")))
  (let ((hash (magit-rev-parse rev)))
    (insert
     (format "[%s](%s)"
             (string-trim (magit-git-output "show" "--format=%h" "--no-patch" hash))
             (format "https://github.com/%s/%s/commit/%s"
                     "kisaragi-hiu"
                     "nanostores-search-params"
                     hash)))))

(provide 'cmds)
;;; cmds.el ends here
