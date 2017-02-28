using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Authorize()]
    [RoutePrefix("api/v1")]
    public class CreditsController : ApiController
    {
        private DataContext db = new DataContext();

        [Route("credits")]
        public IQueryable<Credit> GetCredits()
        {
            return db.Credits;
        }

        [Route("credits/{id}")]
        [ResponseType(typeof(Credit))]
        public async Task<IHttpActionResult> GetCredit(int id)
        {
            Credit credit = await db.Credits.FindAsync(id);
            if (credit == null)
            {
                return NotFound();
            }

            return Ok(credit);
        }

        [Route("credits/{id}")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCredit(int id, Credit credit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != credit.Id)
            {
                return BadRequest();
            }

            db.Entry(credit).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CreditExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("credits")]
        [ResponseType(typeof(Credit))]
        public async Task<IHttpActionResult> PostCredit(Credit credit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Credits.Add(credit);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = credit.Id }, credit);
        }

        [Route("credits/{id}")]
        [ResponseType(typeof(Credit))]
        public async Task<IHttpActionResult> DeleteCredit(int id)
        {
            Credit credit = await db.Credits.FindAsync(id);
            if (credit == null)
            {
                return NotFound();
            }

            db.Credits.Remove(credit);
            await db.SaveChangesAsync();

            return Ok(credit);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CreditExists(int id)
        {
            return db.Credits.Count(e => e.Id == id) > 0;
        }
    }
}