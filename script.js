$(document).ready(function() {
    const hours = [
      "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"
    ];
  
    const timeBlocks = $('.time-blocks');
  
    // Function to load saved appointments from localStorage
    const loadAppointments = () => {
      hours.forEach(hour => {
        const hourId = hour.replace(/[^\w\s]/gi, '').toLowerCase();
        const savedAppointment = localStorage.getItem(hourId);
        if (savedAppointment) {
          $(`#hour-${hourId} .description`).val(savedAppointment);
        }
      });
    };
  
    hours.forEach(hour => {
      const currentHour = dayjs().format('hA');
      const hourId = hour.replace(/[^\w\s]/gi, '').toLowerCase();
      let timeBlockClass = 'future';
      
      if (hour === currentHour) {
          timeBlockClass = 'present';
      } else if (dayjs().isAfter(dayjs(hour, 'hA'))) {
          timeBlockClass = 'past';
      }
  
      const timeBlockHTML = `
          <div id="hour-${hourId}" class="row time-block ${timeBlockClass}">
              <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
              <textarea class="col-8 col-md-10 description" rows="3"></textarea>
              <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                  <i class="fas fa-save" aria-hidden="true"></i>
              </button>
          </div>
      `;
      timeBlocks.append(timeBlockHTML);
    });
  
    // Load appointments from localStorage
    loadAppointments();
  
    // Save button click event
    $('.time-blocks').on('click', '.saveBtn', function() {
      const hourId = $(this).closest('.time-block').attr('id').split('-')[1];
      const appointmentText = $(this).siblings('.description').val();
      localStorage.setItem(hourId, appointmentText);
  
      // Optional: Show notification
      $('#notify').slideDown().delay(2000).slideUp();
    });
  });
  