document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const tableBody = document.querySelector('#student-table tbody');
    
    
    let students = JSON.parse(localStorage.getItem('students')) || [];
    renderStudents(students);

    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const student = {
            name: form.studentName.value,
            id: form.studentId.value,
            email: form.email.value,
            contact: form.contact.value
        };

        
        if (!student.name || !student.id || !student.email || !student.contact) {
            alert("All fields are required!");
            return;
        }

        
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));

        renderStudents(students);
        form.reset();
    });

    
    function renderStudents(studentList) {
        tableBody.innerHTML = '';
        studentList.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        addEventListeners();
    }

    
    function addEventListeners() {
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                students.splice(index, 1);
                localStorage.setItem('students', JSON.stringify(students));
                renderStudents(students);
            });
        });

        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                const student = students[index];
                form.studentName.value = student.name;
                form.studentId.value = student.id;
                form.email.value = student.email;
                form.contact.value = student.contact;
                students.splice(index, 1); // Remove current entry
                localStorage.setItem('students', JSON.stringify(students));
                renderStudents(students);
            });
        });
    }
});
