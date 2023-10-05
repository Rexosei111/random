from pydantic import BaseModel


class CertificateRead(BaseModel):
    certificate_id: str
    name_of_student: str
    programme: str
    department: str
    cwa: float
    degree_classification: str
    year_of_completion: int
    index_number: str
