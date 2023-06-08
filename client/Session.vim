let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Development/review-site/client
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +1 ~/Development/review-site/client/src/api/useCreateApi.ts
badd +24 ~/Development/review-site/client/src/features/user-profile/api/useUserProfile.ts
badd +115 src/pages/user/\[id].tsx
badd +104 src/features/business-details/components/UserReview/UserReview.tsx
badd +23 next.config.js
badd +33 src/pages/index.tsx
badd +6 package.json
badd +55 src/features/register-business/components/FormStep4/UploadBusinessImage.tsx
badd +3 src/utils/text/index.ts
badd +20 src/features/search-business/components/BusinessCard/BusinessCard.tsx
badd +27 src/features/business-details/components/BusinessImage/BusinessImage.tsx
badd +29 src/features/write-review/components/ReviewCard/ReviewCard.tsx
badd +16 src/features/recommended-business/components/BusinessCard/BusinessCard.tsx
badd +102 src/features/business-details/components/UserQuestion/UserQuestion.tsx
badd +2 src/features/business-details/components/ReportUserDropdown/ReportUserDropdown.tsx
badd +9 ~/Development/review-site/common/data/errorsMessages.ts
badd +74 src/features/business-details/layouts/ReviewSection/ReviewSection.tsx
badd +56 src/features/business-details/layouts/QASection/QASection.tsx
badd +17 src/features/home-page/components/CategoryDropdown/CategoryDropdown.tsx
badd +40 src/features/authentication/components/LoginModal.tsx
badd +51 src/features/business-details/components/Ratings/Ratings.tsx
badd +69 src/pages/search/business/\[businessId].tsx
badd +46 src/features/business-details/layouts/CommunitySection/CommunitySection.tsx
badd +36 src/features/business-details/queries/useSubmitReview.ts
badd +1 src/features/business-details/queries/useHandleQuestionLikes.ts
badd +1 src/features/business-details/queries/useSubmitQuestion.ts
badd +56 src/features/business-details/queries/useSubmitReply.ts
badd +29 src/features/search-business/hooks/useFetchBusinesses.tsx
badd +83 src/pages/search/business/index.tsx
badd +26 tailwind.config.js
badd +16 src/features/register-business/hooks/useSubmitForm.ts
badd +18 ~/Development/review-site/client/src/features/user-profile/api/useUserReviews.ts
badd +13 ~/Development/review-site/client/src/features/write-review/components/ReviewCards/ReviewCards.tsx
badd +46 src/components/userprofile/UserProfile.tsx
badd +29 src/pages/_app.tsx
badd +10 ~/Development/review-site/client/src/layouts/ToastProvider/ToastProvider.tsx
badd +24 src/components/layout/app/AppLayout.tsx
badd +21 src/layouts/UserProvider.tsx
badd +38 src/hooks/browser/useCookie.ts
badd +2 ~/Development/review-site/client/cypress/e2e/spec.cy.ts
badd +2 ~/Development/review-site/client/cypress/tsconfig.json
badd +53 src/features/business-details/components/StartReviewForm/UploadImages.tsx
badd +2 src/utils/tailwind/classNames.ts
badd +1 ~/Development/review-site/client/.eslintrc.json
badd +8 src/components/Footer/Footer.tsx
badd +4 ~/Development/review-site/client/cypress/e2e/createReview.cy.ts
badd +1 ~/Development/review-site/client/cypress/e2e/search-business.cy.ts
badd +5 cypress.config.ts
badd +5 src/features/register-business/layouts/FormContainer/data.ts
badd +130 ~/Development/review-site/client/src/features/register-business/layouts/FormContainer/FormContainer.tsx
badd +40 src/features/business-details/components/OpenOrClosed/OpenOrClosed.tsx
badd +20 src/features/home-page/api/useSearchBusiness.ts
badd +9 src/features/search-business/layouts/SearchBusinessSection/SearchBusinessSection.tsx
badd +20 ~/Development/review-site/client/src/features/home-page/components/Searchbar/Searchbar.tsx
badd +31 src/features/business-details/components/Services/Services.tsx
badd +16 ~/Development/review-site/client/src/pages/register-business/form.tsx
badd +9 ~/Development/review-site/client/src/pages/register-business/index.tsx
badd +39 ~/Development/review-site/client/src/features/register-business/components/FormStep4/FormStep4.tsx
badd +9 ~/Development/review-site/client/src/features/register-business/components/MyLabel/MyLabel.tsx
argglobal
%argdel
$argadd NvimTree_1
edit ~/Development/review-site/client/src/features/register-business/components/MyLabel/MyLabel.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
balt ~/Development/review-site/client/src/features/register-business/components/FormStep4/FormStep4.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 9 - ((6 * winheight(0) + 7) / 14)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 9
normal! 010|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
nohlsearch
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
