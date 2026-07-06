## 1. Công cụ AI em sử dụng

Trong project này, em sử dụng AI như một công cụ hỗ trợ phân tích, lập kế hoạch, viết code ban đầu và debug.

Các công cụ em dùng:

* ChatGPT
* Codex trong VSCode

Cách em dùng hai công cụ này có khác nhau:

* ChatGPT dùng để phân tích đề, tạo `PROJECT_CONTEXT.md`, tư vấn prompt và kiểm tra hướng làm trước khi đưa prompt vào Codex.
* Codex trong VSCode dùng để sửa code trực tiếp trong project theo từng phase.

Em chia project thành nhiều bước nhỏ, sau mỗi bước đều kiểm tra lại code, chạy lệnh verify và test thủ công flow chính.

## 2. Cách em bắt đầu project

Sau khi đọc đề bài, em xác định đây là một MVP demo, không phải production system.

Flow chính cần làm là:

```text id="kpouu6"
Sale → Agency → Track Record → Dashboard
```

Vì vậy, mục tiêu ban đầu của em là giữ project tập trung vào các phần bắt buộc:

* Tạo Sale
* Tạo Agency và gán vào Sale
* Tạo Track Record và gán vào Agency
* Hiển thị dashboard thống kê cơ bản

Em không để AI tự mở rộng sang các phần như authentication, authorization, roles, edit/delete, import/export, notification, REST API hoặc advanced reporting, vì các phần đó không cần thiết cho bài MVP này.

## 3. Lý do chọn Laravel + Inertia + React

Em chọn Laravel + Inertia + React vì đây là hướng monolith phù hợp với một MVP nhỏ.

Với Laravel + Inertia, backend routing, validation, migration, Eloquent relationship và React UI vẫn nằm trong cùng một project. Điều này giúp project dễ chạy, dễ demo và không cần tách riêng backend API với frontend app.

Em cũng đã quen với setup Laravel + Inertia, nên có thể tập trung vào luồng nghiệp vụ và cách tổ chức project thay vì mất thời gian làm quen với một stack mới.

Ban đầu em có cân nhắc setup Docker/Inertia/React thủ công, nhưng sau đó chọn Laravel Sail và official Laravel React starter kit vì starter kit đã có sẵn:

* Laravel
* Inertia
* React
* TypeScript
* Tailwind
* shadcn/ui
* Sail
* Wayfinder

Việc dùng starter kit giúp giảm rủi ro setup sai hoặc tốn thời gian vào những phần không phải trọng tâm của bài test.

## 4. Tạo PROJECT_CONTEXT.md trước khi code

Trước khi để Codex sửa code, em tạo file `PROJECT_CONTEXT.md`.

File này dùng như context cố định cho coding agent. Trong đó em ghi rõ:

* Project type
* Tech stack
* MVP flow
* Database entities
* Relationships
* Routes cần có
* Validation rules
* UI direction
* Out-of-scope features
* Success criteria

Mục đích là để Codex có một “source of truth” khi làm project. Nhờ vậy, mỗi prompt sau đó không cần giải thích lại toàn bộ đề bài, mà chỉ cần yêu cầu Codex đọc `PROJECT_CONTEXT.md` và làm đúng phase hiện tại.

Ví dụ thay vì prompt kiểu:

```text id="xem005"
Build this Laravel app.
```

em dùng prompt theo phase, ví dụ:

```text id="hhajy0"
Read PROJECT_CONTEXT.md.

Implement the database layer for the MVP.

Create the necessary migrations, models, relationships, factories, and seeders based on the approved context.

Use clean Laravel conventions and make reasonable implementation decisions if small details are missing.

Do not build controllers or UI yet.
```

Cách này giúp giảm rủi ro AI làm lan man hoặc tự thêm feature ngoài yêu cầu.

## 5. Dùng ChatGPT để review prompt trước khi đưa vào Codex

Một kinh nghiệm em dùng trong project này là không paste prompt vào Codex ngay lập tức.

Trước khi dùng prompt với Codex, em thường dùng một context khác trong ChatGPT để kiểm tra:

* Prompt có quá rộng không
* Prompt có quá cứng không
* Prompt có làm Codex hiểu sai hướng không
* Có cần thêm constraint nào không
* Có đang yêu cầu quá nhiều việc trong một lần không

Ví dụ, prompt setup ban đầu của em còn quá chung:

```text id="qrxzvl"
Read PROJECT_CONTEXT.md.

Implement Docker setup with Laravel + Inertia + React + TypeScript only.
Do not implement business features yet.
```

Prompt này dễ làm Codex hiểu là cần tự tạo Docker setup và tự wire Inertia/React/TypeScript thủ công.

Sau khi review lại, em đổi thành prompt rõ hơn:

```text id="19zg0k"
Read PROJECT_CONTEXT.md.

Set up the base Laravel project only.

Use Laravel Sail and the official Laravel React starter kit for Laravel + Inertia + React + TypeScript + Tailwind + shadcn/ui.

Do not manually wire Inertia/React if the starter kit can provide it.

Do not implement Sale, Agency, TrackRecord, dashboard, migrations, controllers, or business UI yet.

After setup, verify Docker/Sail, Laravel, Vite, TypeScript, and production build all work.
```

Prompt sau tốt hơn vì nó chỉ rõ hướng setup mong muốn: dùng official starter kit thay vì tự cấu hình mọi thứ từ đầu.

## 6. Flow sử dụng AI từ đầu đến cuối

Em triển khai project theo từng phase như sau:

```text id="j772co"
Assignment analysis
→ PROJECT_CONTEXT.md
→ Prompt review
→ Laravel Sail + React starter kit setup
→ Database layer
→ Backend layer
→ Shared UI foundation
→ Sales flow
→ Agencies flow
→ Track Records flow
→ Dashboard
→ Pagination/filter
→ Test/debug
→ README
→ AI_USAGE.md
```

Mỗi phase có một prompt riêng, mục tiêu riêng và bước kiểm tra riêng. Em không yêu cầu Codex làm nhiều layer cùng lúc nếu chưa cần thiết.

## 7. Phase 1 — Setup base project

Ở phase đầu tiên, em chỉ yêu cầu Codex setup base Laravel project.

Prompt dùng:

```text id="jfm6wc"
Read PROJECT_CONTEXT.md.

Set up the base Laravel project only.

Use Laravel Sail and the official Laravel React starter kit for Laravel + Inertia + React + TypeScript + Tailwind + shadcn/ui.

Do not manually wire Inertia/React if the starter kit can provide it.

Do not implement Sale, Agency, TrackRecord, dashboard, migrations, controllers, or business UI yet.

After setup, verify Docker/Sail, Laravel, Vite, TypeScript, and production build all work.
```

Kết quả mong muốn của phase này là project chạy được, chưa có business logic.

Sau phase này, em kiểm tra:

```bash id="elby50"
./vendor/bin/sail up -d
./vendor/bin/sail npm run types:check
./vendor/bin/sail npm run build
```

Ở bước này em không yêu cầu Codex tạo Sale, Agency, TrackRecord hay dashboard, vì nếu setup chưa ổn mà đã thêm business code thì sẽ khó debug hơn.

## 8. Phase 2 — Database layer

Sau khi base project chạy được, em mới chuyển sang database.

Prompt dùng:

```text id="jg7b8s"
Read PROJECT_CONTEXT.md.

Implement the database layer for the MVP.

Create the necessary migrations, models, relationships, factories, and seeders based on the approved context.

Use clean Laravel conventions and make reasonable implementation decisions if small details are missing.

Do not build controllers or UI yet.
```

Trong phase này, em muốn Codex chỉ làm:

* Migrations
* Models
* Relationships
* Factories
* Seeders

Em chủ động chuẩn hóa data model trước khi để AI generate code. Ví dụ:

* Không dùng field `contact` chung chung, mà tách thành `email` và `phone_number`
* Không dùng `area`, mà dùng `region`
* Không dùng `customer_name` trong Track Record, mà dùng `title`
* Status lưu trong database bằng English values như `active`, `inactive`, `new`, `contacted`, `potential`, `closed`, `lost`

Lý do là database nên có field name rõ nghĩa, dễ validate và dễ maintain. Nếu cần label tiếng Việt hoặc label thân thiện hơn, phần đó có thể xử lý ở UI.

Sau khi Codex làm database layer, em verify bằng:

```bash id="n3pw98"
./vendor/bin/sail artisan migrate:fresh --seed
```

Ở phase này có lỗi factory liên quan đến optional unique values. Em phát hiện khi chạy seed, sau đó yêu cầu Codex sửa lại factory và chạy lại migration/seed để kiểm tra.

## 9. Phase 3 — Backend layer

Sau khi database ổn, em mới implement backend layer.

Prompt dùng:

```text id="ui71xz"
Read PROJECT_CONTEXT.md.

Implement the backend layer for the MVP:
routes, controllers, validation, and Inertia responses.

Keep it simple and aligned with the context.
Do not build the UI yet.
```

Trong phase này, Codex làm:

* Web routes
* Controllers
* Form Request validation
* Inertia responses
* Backend feature tests

Em vẫn giữ scope là list/create/store, không làm show/edit/update/delete vì đề bài không yêu cầu.

Sau phase backend, em chạy:

```bash id="oh3drc"
./vendor/bin/sail artisan test
./vendor/bin/sail npm run types:check
./vendor/bin/sail npm run build
```

Việc test ở đây giúp đảm bảo backend không chỉ đúng syntax mà còn render được Inertia responses và không làm hỏng TypeScript/build.

## 10. Phase 4 — Shared UI foundation

Sau khi backend đã có Inertia responses, em mới tạo UI foundation.

Prompt dùng:

```text id="jgsm79"
Read PROJECT_CONTEXT.md.

Create the shared React/Inertia layout and reusable UI components.

Build the UI foundation with a clean, lightly polished internal CRM/dashboard style from the start.

Include layout, navigation, page headers, stat cards, status badges, empty states, and simple reusable form/table patterns where useful.

Make spacing, cards, borders, badges, typography, and navigation states consistent now, so later pages can reuse them without needing a separate polish pass.

Do not implement business pages yet unless needed to verify the layout.
Do not add business logic or features outside the context.
Keep it lightweight, professional, and starter-kit friendly.
```

Mục tiêu của phase này là chuẩn bị UI dùng chung trước khi làm từng page.

Em không muốn tạo một design system lớn. Các component chỉ cần đủ dùng cho MVP:

* Layout
* Navigation
* PageHeader
* StatCard
* StatusBadge
* EmptyState
* Form components
* Table/list pattern

Việc làm UI foundation trước giúp các page sau đồng nhất hơn, tránh việc cuối project mới phải polish lại toàn bộ.

## 11. Phase 5 — Business pages

Sau khi có backend và layout chung, em làm từng flow riêng.

### Sales flow

```text id="is1ncw"
Read PROJECT_CONTEXT.md.

Implement the Sales flow.

Build the list and create experience in a clean Laravel + Inertia + React style.
Do not add edit, delete, show, auth, roles, or extra features.
```

### Agencies flow

```text id="45h8qt"
Read PROJECT_CONTEXT.md.

Implement the Agencies flow.

Build the list and create experience, including assigning an Agency to a Sale.
Keep it aligned with the approved data model and UI direction.
```

### Track Records flow

```text id="vlkgu9"
Read PROJECT_CONTEXT.md.

Implement the Track Records flow.

Build the list and create experience, including assigning a Track Record to an Agency.
Show related Agency and Sale information where useful.
```

Em tách từng flow ra riêng để dễ kiểm tra. Sales đơn giản nhất, Agencies phụ thuộc vào Sales, Track Records phụ thuộc vào Agencies. Làm theo thứ tự này giúp giảm lỗi quan hệ dữ liệu.

## 12. Phase 6 — Dashboard

Sau các flow chính, em làm Dashboard.

Prompt dùng:

```text id="zi5wrb"
Read PROJECT_CONTEXT.md.

Implement the Dashboard.

Use real database statistics for the required MVP metrics.
Keep the dashboard simple, useful, and demo-friendly.
```

Dashboard dùng dữ liệu thật từ database:

* Active Sales count
* Agencies count
* Track Records count
* Track Records grouped by status

Em không thêm chart phức tạp vì đề bài chỉ yêu cầu thống kê cơ bản. Mục tiêu là dashboard đủ rõ để demo trạng thái dữ liệu sau khi tạo Sale, Agency và Track Record.

## 13. Phase 7 — Pagination và filter

Pagination/filter được thêm sau khi core flow đã chạy.

Prompt dùng:

```text id="shyere"
Read PROJECT_CONTEXT.md.

Add simple pagination and filtering to the existing Sales, Agencies, and Track Records list pages.

Use Laravel pagination and Inertia query parameters.

Filters:
- Sales: status, optional keyword search
- Agencies: Sale, optional keyword search
- Track Records: status, Agency, optional keyword search

Preserve filters across pagination and add a clear/reset filters action.

Keep the UI simple and reusable.
Do not add advanced search, edit/delete, auth, roles, export/import, or complex table libraries.
```

Em không thêm phần này ngay từ đầu vì pagination/filter là cải thiện usability, không phải core flow. Nếu làm quá sớm, controller và UI sẽ phức tạp hơn trước khi flow chính được kiểm chứng.

## 14. Phase 8 — Test full flow

Sau khi có đủ các phần chính, em test lại flow bắt buộc:

```text id="yyns0x"
Create Sale → Create Agency → Create Track Record → View Dashboard
```

Prompt dùng để yêu cầu Codex kiểm tra:

```text id="zz32le"
Read PROJECT_CONTEXT.md.

Test the full required flow:
Create Sale → Create Agency → Create Track Record → View Dashboard.

Fix only issues that block or clearly harm this flow.
Do not add new features.
```

Em tự kiểm tra lại trên UI, không chỉ dựa vào việc build pass. Vì build pass chỉ chứng minh code compile được, chưa chắc flow demo đã đúng.

## 15. Các lỗi gặp phải và cách xử lý

### 15.1. Prompt setup ban đầu quá rộng

Lỗi đầu tiên không phải lỗi code, mà là lỗi prompt.

Prompt setup ban đầu chưa nói rõ dùng Sail và official starter kit, nên Codex có xu hướng tự setup Docker và tự wire Inertia/React/TypeScript.

Em sửa bằng cách viết rõ:

* Use Laravel Sail
* Use official Laravel React starter kit
* Do not manually wire Inertia/React

Sau khi sửa prompt, hướng setup rõ hơn và ít rủi ro hơn.

### 15.2. File ownership trong Sail

Một số file được tạo bởi container/root user, gây lỗi khi Laravel cần ghi log, cache hoặc Wayfinder cần generate file.

Cách xử lý là sửa ownership cho project files, `storage` và `bootstrap/cache`.

Lỗi này cho thấy khi dùng AI/coding agent, em vẫn phải đọc log và hiểu vấn đề môi trường, không chỉ xem output cuối.

### 15.3. Vite port conflict

Vite bị lỗi vì port đang được dùng. Em đổi port project thành:

```text id="r83bzh"
Laravel app: 8001
Vite: 5174
MySQL: 3308
```

Có lúc Vite vẫn báo port đang dùng vì process cũ còn chạy trong container.

Lệnh kiểm tra:

```bash id="t9ib4r"
./vendor/bin/sail root-shell -c "ps -ef | grep vite | grep -v grep"
```

Lệnh dừng stale Vite process:

```bash id="icvy4a"
./vendor/bin/sail root-shell -c "pkill -f 'node /var/www/html/node_modules/.bin/vite'"
```

### 15.4. Factory bug khi seed

Khi chạy seed, factory có lỗi với optional unique values. Em phát hiện bằng lệnh:

```bash id="qkab95"
./vendor/bin/sail artisan migrate:fresh --seed
```

Sau đó Codex sửa lại factory và em chạy lại migration/seed để verify.

## 16. Các lệnh kiểm tra em dùng

Trong quá trình làm, em dùng các lệnh sau để kiểm tra project:

```bash id="agp6yd"
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate:fresh --seed
./vendor/bin/sail artisan test
./vendor/bin/sail npm run types:check
./vendor/bin/sail npm run build
./vendor/bin/sail npm run dev
```

Ngoài ra, em test thủ công trên trình duyệt để đảm bảo đúng flow demo:

```text id="wcqebs"
Create Sale → Create Agency → Create Track Record → View Dashboard
```

## 17. Những điểm em tự kiểm soát khi dùng AI

Trong project này, em cố gắng không để AI quyết định thay toàn bộ hướng làm.

Các phần em tự kiểm soát gồm:

* Scope: giữ project đúng MVP, không mở rộng sang production-level features.
* Architecture: chọn Laravel + Inertia theo hướng monolith để phù hợp với demo nhỏ.
* Setup: dùng Laravel Sail và official React starter kit thay vì tự cấu hình thủ công.
* Data model: chuẩn hóa field name, relationship và status values trước khi generate code.
* Implementation order: làm setup → database → backend → UI → business pages → dashboard → pagination/filter.
* Review process: đọc lại prompt, kiểm tra output của Codex, chạy test/build và test thủ công.
* Feature control: nếu AI gợi ý hoặc tạo phần ngoài scope, em bỏ hoặc yêu cầu sửa lại.

Điểm quan trọng nhất là em không xem output của AI là đúng mặc định. AI giúp em làm nhanh hơn, nhưng em vẫn giữ vai trò quyết định cuối cùng.

## 18. Ghi chú về cách dùng AI

Một số nguyên tắc em áp dụng trong project này:

* Không đưa prompt mơ hồ vào Codex.
* Luôn dùng một context khác để tư vấn và chỉnh prompt trước.
* Prompt nên theo từng phase, không yêu cầu làm quá nhiều việc cùng lúc.
* `PROJECT_CONTEXT.md` nên là nguồn context chính cho coding agent.
* Luôn kiểm tra cả prompt input và code output do AI tạo ra.
* Test sau từng phase để phát hiện lỗi sớm.
* Không thêm feature khi core flow chưa chạy ổn.
* Không để AI tự mở rộng scope chỉ vì “có vẻ hay”.

## 19. Tóm tắt

Em dùng AI trong project này theo hướng có kiểm soát.

ChatGPT được dùng để phân tích đề, tạo context, review prompt và hỗ trợ định hướng. Codex trong VSCode được dùng để sửa code theo từng phase.

Flow tổng quát:

```text id="evda7b"
Assignment
→ PROJECT_CONTEXT.md
→ Prompt review
→ Base setup
→ Database layer
→ Backend layer
→ UI foundation
→ Sales / Agencies / Track Records
→ Dashboard
→ Pagination/filter
→ Test/debug
→ README
→ AI_USAGE.md
```

Cách làm này giúp project bám sát yêu cầu chính, hạn chế over-engineering và vẫn tận dụng được AI để tăng tốc quá trình phát triển.
