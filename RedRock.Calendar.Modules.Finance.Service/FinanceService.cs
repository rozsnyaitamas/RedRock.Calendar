using RedRock.Calendar.Modules.Events.Contract;
using RedRock.Calendar.Modules.Finance.Business;
using RedRock.Calendar.Modules.Finance.Business.PaymentStrategy;
using RedRock.Calendar.Modules.Finance.Contract;
using RedRock.Calendar.Modules.Users.Contract;
using Syncfusion.Drawing;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Graphics;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RedRock.Calendar.Modules.Finance.Service
{
    public class FinanceService : IFinanceService
    {
        private readonly IFinanceBusinessLogic financeLogic;
        private readonly IEventService eventService;
        private readonly IUserService userService;

        public FinanceService(IFinanceBusinessLogic financeLogic, IEventService eventService, IUserService userService
            )
        {
            this.financeLogic = financeLogic;
            this.eventService = eventService;
            this.userService = userService;
        }

        public async Task<IEnumerable<FinanceDTO>> GetMonthlyFee(Guid userReference, DateTime start, DateTime end)
        {
            var userRole = await userService.GetUserRole(userReference);
            var financeDTOs = new List<FinanceDTO>();
            if (userRole.Equals(UserRole.PropertyOwner))
            {
                var users = await userService.GetUsers();
                foreach (var user in users)
                {
                    var financeDTO = await GetMonthlyFeeForUser(user, start, end);
                    if (financeDTO != null) financeDTOs.Add(financeDTO);
                }
            }
            else
            {
                var user = await userService.GetUserById(userReference);
                var financeDTO = await GetMonthlyFeeForUser(user, start, end);
                if (financeDTO != null) financeDTOs.Add(financeDTO);
            }

            return financeDTOs;
        }

        private async Task<FinanceDTO> GetMonthlyFeeForUser(UserDTO user, DateTime start, DateTime end)
        {
            var userReference = user.Id;
            var userRole = user.Role;
            var events = await eventService.GetIntervalWithUserRefAsync(userReference, start, end);
            if (events != null)
            {
                var paymentStrategy = PaymentStrategyFactory.GetPaymentStrategy(userRole);
                var result = financeLogic.CalculateMonthlyFee(events, paymentStrategy);

                return FinanceDTOBuilder(userReference, result, start.Month, events.Count(), paymentStrategy.GetPrice());
            }
            return null;
        }

        private FinanceDTO FinanceDTOBuilder(Guid userReference, int sum, int month, int eventsNumber, int price)
        {
            return new FinanceDTO { UserReference = userReference, Sum = sum, Month = month, EventsNumber = eventsNumber, Price = price };
        }

        public async Task<FileStreamResult> GetFeeDocument(Guid userId, DateTime start, DateTime end)
        {
            var finanaceDTOs = await GetMonthlyFee(userId, start, end);
            var users = await userService.GetUsers();

            var htmlContent = FeeTemplateGenerator.GetFeeString(finanaceDTOs, users);

            var ms = PdfMemoryStreamGenerator(htmlContent);

            FileStreamResult fileStreamResult = new FileStreamResult(ms, "application/pdf")
            {
                FileDownloadName = "Sample.pdf"
            };
            return fileStreamResult;
        }

        private MemoryStream PdfMemoryStreamGenerator(string content)
        {
            //Create a new PDF document
            PdfDocument document = new PdfDocument();

            //Add a page to the document
            PdfPage page = document.Pages.Add();

            //Create PDF graphics for the page
            PdfGraphics graphics = page.Graphics;

            //Set the standard font
            PdfFont font = new PdfStandardFont(PdfFontFamily.Helvetica, 20);

            //Draw the text
            graphics.DrawString(content, font, PdfBrushes.Black, new PointF(0, 0));

            //Saving the PDF to the MemoryStream
            MemoryStream stream = new MemoryStream();
            document.Save(stream);
            //If the position is not set to '0' then the PDF will be empty.
            stream.Position = 0;
            //Close the document.
            document.Close(true);
            return stream;
        }
    }
}
